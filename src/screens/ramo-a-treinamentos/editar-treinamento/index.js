import React, { useEffect, useState } from "react";
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
import url from '../../../functionsCenter/urlController'
import ModalJustificativaTreinamento from "../../../components/modalJustificativaTreinamento";

function EditarTreinamento() {
  const location = useLocation();
  const { id } = location.state || {};

  const [treinamento, setTreinamento] = useState({}); // Inicializa como um objeto vazio

  const token = localStorage.getItem('authToken');
  useEffect(() => {
    fetch(`${url}/cursos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTreinamento(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id]);



  const [openModal, setOpenModal] = useState(null);
  const handleOpen = (modalType) => () => setOpenModal(modalType);
  const handleClose = () => setOpenModal(null);

  const [instructor, setInstructor] = useState('');
  const [version, setVersion] = useState('');
  const [title, setTitle] = useState('');
  const [workload, setCourse_duration] = useState('');
  const [codificationNumber, setCodificationNumber] = useState('');
  const [codificationSigla, setCodificationSigla] = useState('');
  const [description, setDescription] = useState('');
  const [validityDate, setValidityYears] = useState('');
  const [startDate, setStartDate] = useState(dayjs());
  const [infoCursos, setInfoCursos] = useState(null); // Adiciona o estado para infoCursos

  useEffect(() => {
    if (treinamento) {
      setInstructor(treinamento.instructor || '');
      setVersion(treinamento.version || '');
      setTitle(treinamento.title || '');
      setCourse_duration(treinamento.workload || '');
      const codificationNumberWithoutPrefix = (treinamento.codification ? treinamento.codification.slice(11) : '');
      setCodificationNumber(codificationNumberWithoutPrefix || '');
      const codificationNumberWithoutSufix = (treinamento.codification || '').replace(codificationNumberWithoutPrefix, '');
      setCodificationSigla(codificationNumberWithoutSufix || '');
      setDescription(treinamento.description || '');

      // Calcular a diferença entre validityDate e startDate em anos
      if (treinamento.validityDate && treinamento.startDate) {
        const startDate = dayjs(treinamento.startDate, 'YYYY-MM-DD');
        console.log(startDate)
        const validityDate = dayjs(treinamento.validityDate, 'YYYY-MM-DD');

        // Verifica se as datas são válidas
        if (startDate.isValid() && validityDate.isValid()) {
          // Calcular a diferença entre validityDate e startDate em anos
          const differenceInYears = validityDate.diff(startDate, 'year');
          setValidityYears(differenceInYears.toString()); // Converte a diferença em anos para string
        } else {
          console.error('Datas inválidas:', startDate.format(), validityDate.format());
          setValidityYears('');
        }


      }

      setStartDate(dayjs(treinamento.startDate, 'YYYY-MM-DD') || dayjs());
    }
  }, [treinamento]);

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(`/treinamentos/${id}`, {
      state: {
        id
      },
    });
  };

  const aoSalvar = async (e) => {
    e.preventDefault();
  
    if (
      !instructor ||
      !version ||
      !title ||
      !workload ||
      !codificationNumber ||
      !description ||
      !validityDate ||
      !startDate
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const infoCursos = {
      instructor,
      version,
      title,
      workload,
      codification: codificationSigla + codificationNumber,
      description: description,
      validityYears: parseInt(validityDate),
      startDate: startDate.format('DD/MM/YYYY'),
    };
    setInfoCursos(infoCursos); // Armazena as informações no estado

    // Abrir o modal e passar as informações do curso
    setOpenModal({
      type: 'justificar',
      cursoInfo: infoCursos,
    });
  };

    //   try {
    //     const response = await fetch(`${url}/cursos/${id}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(infoCursos),
    //     });
    //     console.log(infoCursos)
    //     if (response.ok) {
    //       navigate("/treinamentos");
    //     } else {
    //       console.error("Erro ao enviar os dados:", response.statusText);
    //     }
    //   } catch (error) {
    //     console.error("Erro ao enviar os dados:", error);
    //   }
    // 
  

  return (
    <>
      <TituloPagina titulopagina={"Editar treinamento"} />

      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={11} lg={10}>
          <DefaultPaper elevation={5} square={false} variant="elevation">
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  value={instructor}
                  id="instructor"
                  label="Nome do Instrutor (a)"
                  variant="outlined"
                  onChange={(e) => setInstructor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  disabled
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
                  value={title}
                  id="procedimento"
                  label="Título do Procedimento de Operação Padrão"
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  value={workload}
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
                    disabled
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
                  disabled
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
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    format='DD/MM/YYYY'
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl required fullWidth>
                  <InputLabel id="validityDate">Validade após</InputLabel>
                  <Select
                    labelId="validityDate"
                    id="validityDate"
                    value={validityDate}
                    label="Validade após"
                    onChange={(e) => setValidityYears(e.target.value)}
                    defaultValue={validityDate}
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
                  value={description}
                  id="description"
                  label="Descrição"
                  multiline
                  maxRows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Stack spacing={2} direction={"row"}>
                  <Botao onClick={aoSalvar} color={"roxo"}>
                    Confirmar
                  </Botao>
                  <Botao color={"branco"} onClick={handleCancelClick}>
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
      {openModal?.type === 'justificar' && (
      <ModalJustificativaTreinamento
        open={Boolean(openModal)}
        onClose={handleClose}
        cursoInfo={openModal.cursoInfo}
        courseId={id}
      />
    )}
  </>
);

}

export default EditarTreinamento;
