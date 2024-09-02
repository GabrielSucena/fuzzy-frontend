import './treinamentoInfo.css'
import {
  Grid,
  IconButton,
  Select,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import DefaultPaper from "../../../components/defaultPaper";
import GraficoMUI from "../../../components/graficoMUI";
import ModalAuditarTreinamento from "../../../components/modalAuditoriaTreinamento";
import ModalNotificarTreinamento from "../../../components/modalNotificarTreinamento";
import ModalObsoletarTreinamento from "../../../components/modalObsoletarTreinamento";
import PurplePaper from "../../../components/purplePaper";
import TituloPagina from "../../../components/titulopagina";
import TabelaMUI2 from "../../../components/tabelaMUI/tabelaMUI"
import { arrumaDatas } from '../../../functionsCenter/functionsCenter';
import Botao from "../../../components/botao";
import { ExtraiRelatorio } from '../../../functionsCenter/functionsCenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModalDescription from '../../../components/modalDescription';

import { useRole } from '../../../functionsCenter/RoleContext';

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
  const [treinamento, setTreinamento] = useState(null);
  const [cargos, setCargos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]); // Supondo que você tenha um initialColaboradores
  const token = localStorage.getItem('authToken');
  const { role } = useRole();

  useEffect(() => {
    fetch(`http://localhost:8080/cursos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log("Colaborador fetched:", data);
        setTreinamento(data);
        setColaboradores(data.collaborators)
      })
      .catch(error => console.error("Fetch error:", error));
  }, [id]);



  const [openModal, setOpenModal] = useState(null);
  const handleOpen = (modalType) => () => setOpenModal(modalType);
  const handleClose = () => setOpenModal(null);
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate(`/editar-treinamentos`, {
      state: { id },
    });
  };


  const refreshColaboradores = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cursos/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();  // Corrigido aqui
      setColaboradores(data.collaborators); // Atualize diretamente
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };



  const handleExtrair = (divExtrair) => {
    // Cria uma função anônima que será chamada no evento de clique
    return () => {
      ExtraiRelatorio({ div: divExtrair });
    };
  };


  if (!treinamento) {
    return <div>Loading...</div>; // or another loading indicator
  }

  return (
    <>
      <TituloPagina
        titulopagina=


        {
          <box>
            {treinamento.title}
            <IconButton onClick={handleOpen('description')} aria-label="delete" color="primary">
              <InfoOutlinedIcon/>
            </IconButton>

          </box>
        }
        descricaotitulo={treinamento.codification}
      />
      {(role === '[admin]' || role === '[manager]') &&
        <div className='botoes-treinamento-editar-conteiner'>
          <div className="botoes-treinamento-editar">
            <Botao color='roxo' onClick={handleEditar}>Editar</Botao>
            <Botao color='branco' onClick={handleOpen('obsoletar')}>Obsoletar</Botao>
            <Botao color='branco' onClick={handleExtrair('informacao-treinamento')}>Extrair</Botao>
            <Botao onClick={() => navigate(`/auditar-treinamento/${treinamento.id}`)} color={"branco"}>Auditar</Botao>
  
          </div>
        </div>
      }

      {openModal === 'obsoletar' && (
        <ModalObsoletarTreinamento open={true} handleClose={handleClose} courseId={id} />
      )}
      {openModal === 'notificar' && (
        <ModalNotificarTreinamento open={true} handleClose={handleClose} colaboradores={"Pedro, João"} />
      )}
      {openModal === 'description' && (
        <ModalDescription open={true} handleClose={handleClose} description={treinamento.description}/>
      )}
      <Grid container >
        <Grid item xs />
        <Grid item xs={10}>
          <Grid container spacing={1} className='informacao-treinamento'>
            <Grid item xs={12} lg={6} >
              <Grid container spacing={1} >
                <Grid item xs={12} md={12} lg={12} >
                  <DefaultPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>
                      <Grid item xs={12} lg={6}>
                        <Stack spacing={{ xs: 2 }} useFlexGap flexWrap="wrap">
                          <Typography sx={{ ...typographyStyle.topic }}>
                            Instrutor(a):
                            <Typography sx={{ ...typographyStyle.text }}>
                              {treinamento.instructor}
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
                        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                          <Typography sx={{ ...typographyStyle.topic }}>
                            Vencimento:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {arrumaDatas({ data: treinamento.validityDate })}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Carga horária:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {treinamento.workload} minutos
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
                          Começo: {arrumaDatas({ data: treinamento.startDate })}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ ...typographyStyle.textWhite }}>
                          Término: {arrumaDatas({ data: treinamento.describeCourse?.end_date })}
                        </Typography>
                      </Grid>
                    </Grid>
                  </PurplePaper>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <DefaultPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>
                      <Grid item xs={9}>
                        <Typography sx={{ ...typographyStyle.topic, fontWeight: 'bold' }}>
                          Vigência atual
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          {treinamento.describeCourse?.status}
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
                        <Typography sx={{ ...typographyStyle.topic, fontWeight: 'bold' }}>
                          Participantes
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          {treinamento.describeCourse?.quantidade}
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

            <Grid item xs={12} lg={6}>
              <DefaultPaper elevation={2} square={false} variant="elevation">
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>
                    <GraficoMUI
                      v1={treinamento.describeCourse?.critico}
                      n1={"Crítico"}
                      c1={'var(--vermelho-escuro)'}
                      v2={treinamento.describeCourse?.maior}
                      n2={"De maior"}
                      c2={'var(--vermelho)'}
                      v3={treinamento.describeCourse?.menor}
                      n3={"De menor"}
                      c3={'var(--salmao)'}
                      v4={treinamento.describeCourse?.na}
                      n4={"Não aplicável"}
                      c4={'var(--cinza-escuro)'}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <GraficoMUI
                      v1={treinamento.describeCourse?.green}
                      n1={"Cursos realizados"}
                      c1={'var(--verde)'}
                      v2={treinamento.describeCourse?.yellow}
                      n2={"Cursos pendentes (0-15 dias)"}
                      c2={'var(--amarelo)'}
                      v3={treinamento.describeCourse?.orange}
                      n3={"Cursos pendentes (16-30 dias)"}
                      c3={'var(--laranja)'}
                      v4={treinamento.describeCourse?.red}
                      n4={"Cursos não realizados"}
                      c4={'var(--vermelho-escuro)'}
                    />
                  </Grid>
                </Grid>
              </DefaultPaper>
            </Grid>
          </Grid>

          <TabelaMUI2 curso_id={id} colaboradores={colaboradores} refreshColaboradores={refreshColaboradores} />
        </Grid>
        <Grid item xs />
      </Grid>

    </>
  );
}

export default TreinamentoInfo;
