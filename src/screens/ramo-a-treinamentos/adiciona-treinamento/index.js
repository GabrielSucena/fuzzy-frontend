import React from "react";
import "./adiciona-treinamento.css";
import Bannerhome from "../../../components/bannerhome";
import Rodape from "../../../components/rodape";
import TituloPagina from "../../../components/titulopagina";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Botao from "../../../components/botao";
import dayjs from "dayjs";

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: 50,
  marginLeft: 200,
  marginRight: 200,
  borderRadius: 20,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function AdicionaTreinamento() {
  const [instrutor, setInstrutor] = React.useState("");
  const [versao, setVersao] = React.useState("");
  const [tituloProcedimento, setTituloProcedimento] = React.useState("");
  const [cargaHorario, setCargaHorario] = React.useState("");
  const [conferencia, setConferencia] = React.useState("");
  const [modalidade, setModalidade] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [validade, setValidade] = React.useState("");
  const [dataInicial, setDataInicial] = React.useState(dayjs("2022-04-17"));
  const [codificacao, setCodificacao] = React.useState("");

  const aoSalvar = (e) => {
    const infoCursos = JSON.stringify({
      instructorName: instrutor,
      version: versao,
      title: tituloProcedimento,
      workload: cargaHorario,
      procedure: conferencia,
      description: descricao,
      date: validade,
      dateInicial: dataInicial,
      courseModality: modalidade,
    });

    console.log("FormSubmetido =>", infoCursos);
  };

  return (
    <>
      <Bannerhome />

      <TituloPagina titulopagina={"Adicionar treinamento"} />
      <DemoPaper elevation={5} square={false} variant="elevation">
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="instrutor"
              label="Instrutor(a)"
              variant="outlined"
              onChange={(e) => setInstrutor(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="Versao"
              label="Versão"
              variant="outlined"
              onChange={(e) => setVersao(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="procedimento"
              label="Título do Procedimento de Operação Padrão"
              variant="outlined"
              onChange={(e) => setTituloProcedimento(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="cargaHoraria"
              label="Carga Horária (minutos)"
              variant="outlined"
              onChange={(e) => setCargaHorario(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="conferencia"
              label="Conferência de Procedimento de Operação Padrão"
              variant="outlined"
              onChange={(e) => setConferencia(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Modalidade</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="modalidade"
                value={modalidade}
                label="Modalidade"
                onChange={(e) => setModalidade(e.target.value)}
              >
                <MenuItem value={"Presencial"}>Presencial</MenuItem>
                <MenuItem value={"Online"}>Online</MenuItem>
                <MenuItem value={"Híbrida"}>Híbrida</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="descricao"
              label="Descrição"
              multiline
              maxRows={4}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Data Inical"
                value={dataInicial}
                onChange={(newValue) => setDataInicial(newValue)}
              />
            </LocalizationProvider>

            {/* <TextField
              fullWidth
              id="dataInicial"
              label="Data inicial da vigência"
              variant="outlined"
              onChange={(e) => setDataInicial(e.target.value)}
            /> */}
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="validade">Validade após</InputLabel>
              <Select
                labelId="validade"
                id="validade"
                value={validade}
                label="Validade após"
                onChange={(e) => setValidade(e.target.value)}
              >
                <MenuItem value={1}>1 anos</MenuItem>
                <MenuItem value={2}>2 anos</MenuItem>
                <MenuItem value={3}>3 anos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="codificacao">Codificação</InputLabel>
              <Select
                labelId="codificacao"
                id="codificacao"
                value={codificacao}
                label="Codificação"
                onChange={(e) => setCodificacao(e.target.value)}
              >
                <MenuItem value={"Cod1"}>Cod1</MenuItem>
                <MenuItem value={"Cod2"}>Cod2</MenuItem>
                <MenuItem value={"Híbrida"}>Híbrida</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Stack spacing={2} direction={"row"}>
              <Botao
                aoClicar={aoSalvar}
                color={"roxo"}
                destino={"./treinamentos"}
              >
                Confirmar
              </Botao>
              <Botao color={"branco"} destino={"./treinamentos"}>
                Cancelar
              </Botao>
            </Stack>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </DemoPaper>
      <Rodape />
    </>
  );
}

export default AdicionaTreinamento;
