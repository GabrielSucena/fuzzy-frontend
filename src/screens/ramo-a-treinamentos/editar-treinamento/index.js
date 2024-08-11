import React, { useEffect, useState } from "react";
import "./adiciona-treinamento.css";
import TituloPagina from "../../../components/titulopagina";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import {
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
import { useLocation, useNavigate } from "react-router-dom";
import { DateField } from "@mui/x-date-pickers";

function EditarTreinamento() {
  const location = useLocation();
  const { id } = location.state || {};

  const [treinamento, setTreinamento] = useState({}); // Inicializa como um objeto vazio

  useEffect(() => {
    fetch(`http://localhost:5001/treinamentos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTreinamento(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id]);

  const [name_instructor, setName_instructor] = useState('');
  const [version, setVersion] = useState('');
  const [name_course, setName_course] = useState('');
  const [course_duration, setCourse_duration] = useState('');
  const [codificationNumber, setCodificationNumber] = useState('');
  const [codificationSigla, setCodificationSigla] = useState('');
  const [descricao, setDescricao] = useState('');
  const [validade, setValidade] = useState('');
  const [dataInicial, setDataInicial] = useState(dayjs());

  useEffect(() => {
    if (treinamento) {
      setName_instructor(treinamento.name_instructor || '');
      setVersion(treinamento.version || '');
      setName_course(treinamento.name_course || '');
      setCourse_duration(treinamento.course_duration || '');
      const codificationNumberWithoutPrefix = (treinamento.codification ? treinamento.codification.slice(11) : '');
      setCodificationNumber(codificationNumberWithoutPrefix || '');
      const codificationNumberWithoutSufix = (treinamento.codification || '').replace(codificationNumberWithoutPrefix, '');
      setCodificationSigla(codificationNumberWithoutSufix || '');
      setDescricao(treinamento.description || '');

      // Calcular a diferença entre validity_date e start_date em anos
      if (treinamento.validity_date && treinamento.start_date) {
        const startDate = dayjs(treinamento.start_date, 'DD/MM/YYYY');
        const validityDate = dayjs(treinamento.validity_date, 'DD/MM/YYYY');

        // Verifica se as datas são válidas
        if (startDate.isValid() && validityDate.isValid()) {
          // Calcular a diferença entre validityDate e startDate em anos
          const differenceInYears = validityDate.diff(startDate, 'year');
          setValidade(differenceInYears.toString()); // Converte a diferença em anos para string
        } else {
          console.error('Datas inválidas:', startDate.format(), validityDate.format());
          setValidade('');
        }


      }

      setDataInicial(dayjs(treinamento.start_date,'DD/MM/YYYY') || dayjs());
    }
  }, [treinamento]);

  const navigate = useNavigate();

  const aoSalvar = async (e) => {
    e.preventDefault();

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
      name_instructor,
      version,
      name_course,
      course_duration,
      codification: codificationSigla + codificationNumber,
      description: descricao,
      validity_date: dataInicial.add(parseInt(validade), 'day').format('DD/MM/YYYY'),
      start_date: dataInicial.format('DD/MM/YYYY'),
      end_date: dataInicial.add(30, 'day').format('DD/MM/YYYY'),
    };

    try {
      const response = await fetch(`http://localhost:5001/treinamentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(infoCursos),
      });

      if (response.ok) {
        navigate("/treinamentos");
      } else {
        console.error("Erro ao enviar os dados:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <>
      <TituloPagina titulopagina={"Editar treinamento"} />

      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={12} lg={10}>
          <DefaultPaper elevation={5} square={false} variant="elevation">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  value={name_instructor}
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
                  value={version}
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
                  value={name_course}
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
                  value={course_duration}
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
                  value={codificationNumber}
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
                    defaultValue={validade}
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
                  value={descricao}
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
                  <Botao onClick={aoSalvar} color={"roxo"}>
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

export default EditarTreinamento;
