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
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import BasicCard from "../../../components/cardTreinamento";

function Treinamentos() {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: 50,
    marginLeft: 200,
    marginRight: 200,
    borderRadius: 20,
  }));

  const [cargos, setCargos] = React.useState("");
  const [departamentos, setDepartamentos] = React.useState("");

  return (
    <>
      <Bannerhome />
      <TituloPagina
        titulopagina="Treinamentos"
        botao1="Adicionar"
        destino1="/adicionar-treinamentos"
        color1="roxo"
      />
      <DemoPaper elevation={5} square={false} variant="elevation">
        <Grid container spacing={5}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id="pesquisa"
              label="Pesquise aqui o treinamento"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Departamento
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={departamentos}
                label="Departamentos"
                onChange={(e) => setDepartamentos(e.target.value)}
              >
                <MenuItem value={10}>Vendas</MenuItem>
                <MenuItem value={20}>Técnico</MenuItem>
                <MenuItem value={30}>Consulta</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cargos}
                label="Cargo"
                onChange={(e) => setCargos(e.target.value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <BasicCard
              procedimento="Estequimetria"
              cod="MED - CA - SOP - 000000001"
              nome="Carlos Nóbrega"
              duration="30"
              dataInicio={"01/02/2024"}
              dataFinal={"01/03/2024"}
              versao={"1.0"}
            />
          </Grid>
        </Grid>
      </DemoPaper>
      <Rodape />
    </>
  );
}

export default Treinamentos;
