import "./treinamentos.css";
import TituloPagina from "../../../components/titulopagina";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BasicCard from "../../../components/cardTreinamento";

function Treinamentos() {
  const [treinamentos, setTreinamentos] = useState([]);
  const [filteredTreinamentos, setFilteredTreinamentos] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const token = localStorage.getItem('authToken');
  const [name_instructor, setName_instructor] = React.useState("");

  useEffect(() => {
    fetch('http://localhost:8080/cursos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        setFilteredTreinamentos(treinamento); // Inicializa o estado de treinamentos filtrados
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err);
      });
  }, [token]);

  useEffect(() => {
    // Função de filtro
    const filtered = treinamentos.filter(treinamento =>
      treinamento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treinamento.codification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treinamento.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTreinamentos(filtered);
  }, [searchTerm, treinamentos]);

  const DemoPaper = styled(Paper)(({ theme }) => ({
    padding: "50px",
    borderRadius: "20px",
  }));
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
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="teste"
                  label="Pesquise aqui o treinamento, codificação ou nome do treinador"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => (setSearchTerm(e.target.value))} // Atualiza o termo de pesquisa com debouncing
                />
              </Grid>
              {filteredTreinamentos.map((treinamento) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={treinamento.id}>
                  <BasicCard
                    id={treinamento.id}
                    procedimento={treinamento.title}
                    cod={treinamento.codification}
                    nome={treinamento.instructor}
                    duration={treinamento.workload}
                    dataInicio={treinamento.startDate}
                    dataFinal={treinamento.endDate}
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
