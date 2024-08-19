import "./treinamentos.css";
import Bannerhome from "../../../components/bannerhome";
import Rodape from "../../../components/rodape";
import TituloPagina from "../../../components/titulopagina";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import BasicCard from "../../../components/cardTreinamento";
import { borderRadius } from "@mui/system";

const Testetheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          backgroundColor: "red",
        },
      },
    },
  },
});

// Estava testando os estilos overrides, ele parece editar tudo mas preciso achar
// a propriedade para alterar o select e as bordas
// Para adicionar o tema basta colocar essa tag no antes do componente <ThemeProvider theme={Testetheme}>

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-outlined": {
    borderRadius: 100,
  },
}));

function Treinamentos() {

  const [treinamentos, setTreinamentos] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/cursos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => {
        if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
    })
    .then(treinamento => {
        console.log("treinamento fetched:", treinamento);
        setTreinamentos(treinamento); // Garante que Treinamentos seja um array
    })
    .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
    });
}, []);

  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: "50px",
    borderRadius: "20px",
  }));


  const [cargos, setCargos] = React.useState("");
  const [departamentos, setDepartamentos] = React.useState("");

  return (
    <>
      <TituloPagina
        titulopagina="Treinamentos"
        botao1="Adicionar"
        destino1="/adicionar-treinamentos"
        color1="roxo"
      />
      <Grid container>
        <Grid item xs />

        <Grid item xs={10}>
          <DemoPaper elevation={5} square={false} variant="elevation">
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="pesquisa"
                  label="Pesquise aqui o treinamento"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={3} lg={3}>
                <FormControl fullWidth color="primary" variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Departamento
                  </InputLabel>
                  <CustomSelect
                    variant="outlined"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={departamentos}
                    label="Departamentos"
                    onChange={(e) => setDepartamentos(e.target.value)}
                  >
                    <MenuItem value={10}>Vendas</MenuItem>
                    <MenuItem value={20}>Técnico</MenuItem>
                    <MenuItem value={30}>Consulta</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cargos}
                    label="Cargo"
                    onChange={(e) => setCargos(e.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </CustomSelect>
                </FormControl>
              </Grid>
              {treinamentos.map((treinamento) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={treinamento.id}>
                  <BasicCard
                    id={treinamento.id}
                    procedimento={treinamento.title}
                    cod={treinamento.codification}
                    nome={treinamento.instructor}
                    duration={treinamento.workload}
                    dataInicio={treinamento.startDate}
                    dataFinal={treinamento.validityDate}
                    versao={treinamento.version}
                  />
                </Grid>
              ))}

              
            </Grid>
          </DemoPaper>
        </Grid>

        <Grid item xs />
      </Grid>
    </>
  );
}

export default Treinamentos;
