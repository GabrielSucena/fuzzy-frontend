import React from "react";
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
  
  const [codificationNumber, setCodificationNumber] = React.useState("");
  const [codificationSigla, setCodificationSigla] = React.useState("");
  
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
      !codificationNumber ||
      !descricao ||
      !validade ||
      !dataInicial 
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

  const infoCursos = {
    instructor: name_instructor,
    version: version,
    title: name_course,
    workload: course_duration,
    codification: codificationSigla+codificationNumber,
    description: descricao,
    validityYears: parseInt(validade),
    startDate: dataInicial.format('DD/MM/YYYY'),
  };



    // const infoCursos = {
    //   name_instructor: name_instructor,
    //   version: version,
    //   name_course: name_course,
    //   course_duration: course_duration,
    //   codification: codificationSigla+codificationNumber,
    //   description: descricao,
    //   // validity_date: dataInicial.add(parseInt(validade)*365, 'day').format('DD/MM/YYYY'), //Não vai precisar no back
    //   start_date: dataInicial.format('DD/MM/YYYY'),
    //   // end_date: dataInicial.add(31, 'day').format('DD/MM/YYYY'), //Não vai precisar no back
    // };
    const token = localStorage.getItem('authToken');

    console.log("FormSubmetido =>", JSON.stringify(infoCursos));

    try {
      const response = await fetch('http://localhost:8080/cursos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Adiciona o token nos headers
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
        <Grid item xs={11} lg={10}>
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
                  label="Título do Procedimento de Operação Padrão"
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
              <Grid item xs={12} lg={2}>
                <FormControl required fullWidth>
                  <InputLabel id="cod">Cod</InputLabel>
                  <Select
                    labelId="cod"
                    id="cod"
                    value={codificationSigla}
                    label="Cod"
                    onChange={(e) => setCodificationSigla(e.target.value)}
                  >
                    <MenuItem value={'CAD-QU-GOP-'}>CAD-QU-GOP</MenuItem>
                    <MenuItem value={'CAD-QU-SOP-'}>CAD-QU-SOP</MenuItem>
                  
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={2}>
                <TextField
                  required
                  fullWidth
                  id="codification"
                  label="Codificação"
                  variant="outlined"
                  onChange={(e) => setCodificationNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      fullWidth
                      required
                      label="Data de Vigência"
                      value={dataInicial}
                      onChange={(newValue) => setDataInicial(newValue)}
                      format='DD/MM/YYYY'
                      disablePast
                    />
                  </LocalizationProvider>
              </Grid>
              <Grid item xs={12} lg={4}>
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
