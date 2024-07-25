// Preciso:

// - Consumir da api e coletar as infomrações dos cursos
// - Criar componentes específicos para cada modelo 



import TituloPagina from "../../../components/titulopagina";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ThemeProvider } from "@emotion/react";
import BasicCard from "../../../components/cardTreinamento";
import { useLocation } from "react-router";
import { Stack, fontStyle, margin, textAlign } from "@mui/system";
import { Flex } from "@chakra-ui/layout";
import { PieChart } from "@mui/x-charts";
import { CurtainsClosed } from "@mui/icons-material"

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

{
  /* <Typography sx={{ ...typographyStyle.topic }}>
Codificação:
<Typography
  variant="overline"
  sx={{ ...typographyStyle.text }}
>
  {cod}
</Typography>
</Typography> */
}

function TreinamentoInfo() {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: "20px",
    borderRadius: "20px",
  }));

  const PaperPurple = styled(Paper)(({ theme }) => ({
    padding: "20px",
    borderRadius: "20px",
    background: "linear-gradient(91deg, #AD00FF 20%, #3B0071 100%)",
  }));

  const [cargos, setCargos] = React.useState("");
  const [departamentos, setDepartamentos] = React.useState("");

  const location = useLocation();

  //A ideia aqui é pegar apenas o cod e atraves dele fazer uma requisição na API
  const { procedimento, cod, nome, duration, dataInicio, dataFinal, versao } =
    location.state || {};

  return (
    <>
      <TituloPagina
        titulopagina={procedimento}
        descricaotitulo={cod}
        botao1="Editar"
        botao2="Obsoletar"
        botao3="Auditoria"
        destino1="/adicionar-treinamentos"
        color1="roxo"
        color2="branco"
        color3="branco"
      />
      {/* Main - Container  */}
      <Grid container>
        {/* Vazio Esquerda */}
        <Grid item xs />
        <Grid item xs={10}>
          <Grid container spacing={1}>
            {/* Esquerda - info  */}
            <Grid item xs={6}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                  <DemoPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Stack
                          spacing={{ xs: 2 }}
                          useFlexGap
                          flexWrap="wrap"
                        >
                          <Typography sx={{ ...typographyStyle.topic }}>
                            Codificação:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {cod}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Versão:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {versao}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Instrutor(a):
                            <Typography sx={{ ...typographyStyle.text, }}>
                              Isabela Carvalho
                            </Typography>
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid item xs={6}>
                        <Stack
                          spacing={{ xs: 1, sm: 2 }}
                          direction="row"
                          useFlexGap
                          flexWrap="wrap"
                        >
                          <Typography sx={{ ...typographyStyle.topic }}>
                            Vencimento:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {dataFinal}
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Carga horária:
                            <Typography sx={{ ...typographyStyle.text }}>
                              {duration} minutos
                            </Typography>
                          </Typography>

                          <Typography sx={{ ...typographyStyle.topic }}>
                            Tipo de treinamento:
                            <Typography sx={{ ...typographyStyle.text }}>
                              Online
                            </Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </DemoPaper>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  <PaperPurple elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={6}>
                        <Typography sx={{ ...typographyStyle.textWhite }}>
                          Início Vigência: {dataInicio}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography sx={{ ...typographyStyle.textWhite }}>
                          Fim Vigência: {dataFinal}
                        </Typography>
                      </Grid>
                    </Grid>
                  </PaperPurple>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <DemoPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={9}>
                        <Typography sx={{ ...typographyStyle.topic }}>
                          Status Treinamento:
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          Em andamento
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <img
                          src="icones/Icon.png"
                          alt="Ícone de Participantes"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Grid>
                    </Grid>
                  </DemoPaper>
                </Grid>

                <Grid item xs={12} md={12} lg={6}>
                  <DemoPaper elevation={2} square={false} variant="elevation">
                    <Grid container spacing={1}>

                      <Grid item xs={9}>
                        <Typography sx={{ ...typographyStyle.topic }}>
                          Participantes:
                        </Typography>
                        <Typography sx={{ ...typographyStyle.text }}>
                          6
                        </Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <img
                          src="icones/Icon.svg"
                          alt="Ícone de Participantes"
                          style={{ width: "auto", height: "auto" }}
                        />
                      </Grid>
                    </Grid>
                  </DemoPaper>
                </Grid>

              </Grid>
            </Grid>

            {/* Direita - Grafico  */}
            <Grid item xs={6}>
              <DemoPaper elevation={5} square={false} variant="elevation">


                <PieChart
                  series={[
                    {
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      innerRadius: 50,
                      outerRadius: 60,
                      paddingAngle: 2,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      data: [
                        { id: 0, value: 25, label: 'Curso Realizado' },
                        { id: 1, value: 25, label: 'Ccurso Não Realizado' },
                        { id: 2, value: 25, label: 'Curso Não Realizado' },
                        { id: 3, value: 25, label: 'Curso Não Realizado' },
                      ],
                    },
                  ]}
                  width={500}
                  height={150}
                />

                <PieChart
                  series={[
                    {
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      innerRadius: 50,
                      outerRadius: 60,
                      paddingAngle: 2,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      data: [
                        { id: 0, value: 25, label: 'Crítica A' },
                        { id: 1, value: 25, label: 'De Maior (MA)' },
                        { id: 2, value: 25, label: 'De Menor (ME)' },
                        { id: 3, value: 25, label: 'Não Aplicavel              ' },
                      ],
                    },
                  ]}
                  width={500}
                  height={150}

                />


              </DemoPaper>
            </Grid>
          </Grid>
        </Grid>

        {/* Vazio Esquerda */}
        <Grid item xs />
      </Grid>
    </>
  );
}

export default TreinamentoInfo;
