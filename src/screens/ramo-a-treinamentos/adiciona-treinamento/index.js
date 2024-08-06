import React from "react";
import "./adiciona-treinamento.css";
import TituloPagina from "../../../components/titulopagina";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Botao from "../../../components/botao";
import dayjs from "dayjs";
import DefaultPaper from "../../../components/defaultPaper";
import { Navigate, useNavigate } from "react-router-dom";
import { DateField, DesktopDatePicker } from "@mui/x-date-pickers";

function AdicionaTreinamento() {
  const [name_instructor, setName_instructor] = React.useState("");
  const [version, setVersion] = React.useState("");
  const [name_course, setName_course] = React.useState("");
  const [course_duration, setCourse_duration] = React.useState("");
  const [codification, setCodification] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [validade, setValidade] = React.useState("");
  const [dataInicial, setDataInicial] = React.useState(dayjs());
  const [codificacao, setCodificacao] = React.useState("");

  const navigate = useNavigate(); // Hook useNavigate

  const aoSalvar = async (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do formulário

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (
      !name_instructor ||
      !version ||
      !name_course ||
      !course_duration ||
      !codification ||
      !descricao ||
      !validade ||
      !dataInicial ||
      !codificacao
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const infoCursos = {
      name_instructor: name_instructor,
      version: version,
      name_course: name_course,
      course_duration: course_duration,
      codification: codification,
      description: descricao,
      validity_date: dataInicial.add(365, 'day').format('DD/MM/YYYY'),
      start_date: dataInicial.format('DD/MM/YYYY'),
      end_date: dataInicial.add(30, 'day').format('DD/MM/YYYY'),
    };
    console.log("FormSubmetido =>", JSON.stringify(infoCursos));

    try {
      const response = await fetch('http://localhost:5001/treinamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoCursos),
      });

      if (response.ok) {
        console.log("Dados enviados com sucesso");
        
        navigate("/treinamentos"); // Navegar para a página de treinamentos
      } else {
        console.error("Erro ao enviar os dados:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };


  return (
    <>
      <TituloPagina titulopagina={"Adicionar treinamento"} />

      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={12} lg={10}>
          <DefaultPaper elevation={5} square={false} variant="elevation">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="name_instructor"
                  label="Nome do Instrutor (a)"
                  variant="outlined"
                  onChange={(e) => setName_instructor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="version"
                  label="Versão"
                  variant="outlined"
                  onChange={(e) => setVersion(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="procedimento"
                  label="Codificação"
                  variant="outlined"
                  onChange={(e) => setName_course(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="cargaHoraria"
                  label="Carga Horária (minutos)"
                  variant="outlined"
                  onChange={(e) => setCourse_duration(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="codification"
                  label="Conferência de Procedimento de Operação Padrão"
                  variant="outlined"
                  onChange={(e) => setCodification(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      fullWidth
                      required
                      label="Data de Vigência"
                      value={dataInicial}
                      onChange={(newValue) => setDataInicial(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                      format='DD/MM/YYYY'
                      disablePast
                    />
                  </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição"
                  multiline
                  maxRows={4}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl required fullWidth>
                  <InputLabel id="validade">Validade após</InputLabel>
                  <Select
                    labelId="validade"
                    id="validade"
                    value={validade}
                    label="Validade após"
                    onChange={(e) => setValidade(e.target.value)}
                  >
                    <MenuItem value={1}>1 ano</MenuItem>
                    <MenuItem value={2}>2 anos</MenuItem>
                    <MenuItem value={3}>3 anos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl required fullWidth>
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
                    onClick={aoSalvar}
                    color={"roxo"}
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
          </DefaultPaper>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </>
  );
}

export default AdicionaTreinamento;
