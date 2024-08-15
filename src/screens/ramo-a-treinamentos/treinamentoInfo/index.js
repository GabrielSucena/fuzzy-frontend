import {
  Grid,
  Select,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import DefaultPaper from "../../../components/defaultPaper";
import Grafico from "../../../components/grafico";
import ModalAuditarTreinamento from "../../../components/modalAuditoriaTreinamento";
import ModalNotificarTreinamento from "../../../components/modalNotificarTreinamento";
import ModalObsoletarTreinamento from "../../../components/modalObsoletarTreinamento";
import PurplePaper from "../../../components/purplePaper";
import TituloPagina from "../../../components/titulopagina";
import TabelaMUI2 from "../../../components/tabelaMUI/tabelaMUI"

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-outlined": {
    borderRadius: 50,
  },
}));

const typographyStyle = {
  text: {
    display: "flex",
    fontSize: 18,
    color: "#9E9E9E",
    textAlign: "center",
    ml: 1

  },
  topic: {
    display: "flex",
    fontSize: 18,
    color: "#565656",
    textAlign: "center",
    ml: 1
  },
  textWhite: {
    display: "flex",
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
  },
};
function TreinamentoInfo() {
  const { id } = useParams();
  const [treinamento, setTreinamento] = useState([])
  const [cargos, setCargos] = useState([])
  const [departamentos, setDepartamentos] = useState([])

  console.log("ID:", id)

  useEffect(() => {
    fetch(`http://localhost:5001/treinamentos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("Colaborador fetched:", data);
        setTreinamento(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, [id]);

  //Modal
  const [openModal, setOpenModal] = useState(null);
  const handleOpen = (modalType) => () => setOpenModal(modalType);
  const handleClose = () => setOpenModal(null);
  const navigate = useNavigate();




  const handleEditar = () => {

    navigate(`/editar-treinamentos`, {
      state: {
        id
      },
    })
  }

  return (
    <>
      <TituloPagina
        titulopagina={treinamento.name_course}
        descricaotitulo={treinamento.codification}
        botao1="Editar"
        botao2="Obsoletar"
        botao3="Auditoria"
        color1="roxo"
        color2="branco"
        color3="branco"
        onClick1={handleEditar}
        onClick2={handleOpen('obsoletar')}
        onClick3={handleOpen('auditoria')}
      />



      {openModal === 'auditoria' && (
        <ModalAuditarTreinamento open={true} handleClose={handleClose} />
      )}
      {openModal === 'obsoletar' && (
        <ModalObsoletarTreinamento open={true} handleClose={handleClose} courseId={id} />
      )}
      {openModal === 'notificar' && (
        <ModalNotificarTreinamento open={true} handleClose={handleClose} colaboradores={"Pedro,João"} />
      )}

      {/* Main - Container  */}
      <Grid container>
        {/* Vazio Esquerda */}
        <Grid item xs />
        {/* Principal*/}
        <Grid item xs={10}>
          <Grid container spacing={1}>
            {/* Esquerda - info  */}
            <Grid item xs={12} lg={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <DefaultPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>
                      <Grid item xs={12} lg={6}>
                        <Stack
                          spacing={{ xs: 2 }}
                          useFlexGap
                          flexWrap="wrap"
                        >

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Instrutor(a):
                            <Typography sx={{ ...typographyStyle.text, }}>
                              {treinamento.name_instructor}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Versão:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {treinamento.version}
                            </Typography>
                          </Typography>


                        </Stack>
                      </Grid>

                      <Grid item xs={12} lg={6}>
                        <Stack
                          spacing={{ xs: 1, sm: 2 }}
                          direction="row"
                          useFlexGap
                          flexWrap="wrap"
                        >
                          <Typography sx={{ ...typographyStyle.topic }}>
                            Vencimento:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {treinamento.validity_date}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Carga horária:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {treinamento.course_duration} minutos
                            </Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </DefaultPaper>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <PurplePaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={6}>
                        <Typography sx={{ ...typographyStyle.textWhite }}>
                          Início Vigência: {treinamento.start_date}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ ...typographyStyle.textWhite }}>
                          Fim Vigência: {treinamento.end_date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </PurplePaper>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <DefaultPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={9}>
                        <Typography sx={{ ...typographyStyle.topic }}>
                          Status Treinamento:
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          {treinamento.status}
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <img
                          src="/icones/Icon.png"
                          alt="Ícone de Participantes"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Grid>
                    </Grid>
                  </DefaultPaper>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <DefaultPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={9}>
                        <Typography sx={{ ...typographyStyle.topic }}>
                          Participantes:
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          {treinamento.quantidade}
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <img
                          src="/icones/Icon.svg"
                          alt="Ícone de Participantes"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Grid>
                    </Grid>
                  </DefaultPaper>
                </Grid>

              </Grid>
            </Grid>

            {/* Direita - Grafico  */}
            <Grid item xs={12} lg={6}>
              <DefaultPaper elevation={2} square={false} variant="elevation">
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>

                    <Grafico
                      v1={treinamento.critico} n1={"Crítico"} c1={'var(--vermelho-escuro)'}
                      v2={treinamento.maior} n2={"De maior"} c2={'var(--vermelho)'}
                      v3={treinamento.menor} n3={"De menor"} c3={'var(--salmao)'}
                      v4={treinamento.na} n4={"Não aplicável"} c4={'var(--cinza)'}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>

                    <Grafico
                      v1={treinamento.green} n1={"Cursos realizados"} c1={'var(--verde)'}
                      v2={treinamento.yellow} n2={"Cursos pendentes (0-15 dias)"} c2={'var(--amarelo)'}
                      v3={treinamento.orange} n3={"Cursos pendentes (16-30 dias)"} c3={'var(--laranja)'}
                      v4={treinamento.red} n4={"Cursos não realizados"} c4={'var(--vermelho-escuro)'} />
                  </Grid>

                </Grid>
              </DefaultPaper>

            </Grid>
          </Grid>
          <TabelaMUI2 colaboradores={treinamento.collaborators}/>

        </Grid>


        {/* Vazio Esquerda */}
        <Grid item xs />
      </Grid>
    </>
  );
}

export default TreinamentoInfo;
