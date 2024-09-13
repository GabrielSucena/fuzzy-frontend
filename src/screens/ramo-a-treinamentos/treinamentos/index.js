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
import { Link } from "react-router-dom"; // Certifique-se de importar Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Certifique-se de importar FontAwesomeIcon
import { faCopy, faCircleExclamation, faCalendar, faArrowAltCircleRight, faUser, faUserTie, faClock } from "@fortawesome/free-solid-svg-icons"; // Importar ícones necessários
import semTreinamentos from "../../semTreinamento.svg";
import url from '../../../functionsCenter/urlController'

function Treinamentos() {
  const [treinamentos, setTreinamentos] = useState([]);
  const [filteredTreinamentos, setFilteredTreinamentos] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [selectedCriticality, setSelectedCriticality] = useState(""); // Adicione o estado para criticality
  const [selectedStatus, setSelectedStatus] = useState(""); // Adicione o estado para status
  const token = localStorage.getItem('authToken');
  const [name_instructor, setName_instructor] = React.useState("");
  

  useEffect(() => {
    fetch(`${url}/cursos`, {
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
  
  const preto = getComputedStyle(document.documentElement).getPropertyValue('--preto-escuro').trim();
  const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
  const branco = getComputedStyle(document.documentElement).getPropertyValue('--branco').trim();


  return (
    <>
      <TituloPagina
        titulopagina="Treinamentos"
        botao1="Adicionar"
        destino1="/adicionar-treinamentos"
        color1="roxo"
      />
      <div className="colaboradores">
        <div className="colaboradores-card">
          <div className="busca-filtros">
            <input
              type="text"
              className="campo-busca"
              placeholder="Pesquise AQUI o treinamento pelo nome, codificação ou instrutor"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            BUSCAR
            
          </div>
          <div className="grid-container">
            {filteredTreinamentos.length > 0 ? (
              filteredTreinamentos.map((treinamento) => (
                <Link className='retirar-estilo' to={`/treinamentos/${treinamento.id}`} key={treinamento.id}>
                  <div className='div-card'>
                    <div className={"treinamento-item"}>

                      <div className="topo-treinamento-card">
                        <div className="treinamento-part">
                          <div className="title-card">{treinamento.title}</div>
                          <div className="version">v{treinamento.version}</div>
                        </div>
                        
                        <div className="codification">{treinamento.codification}</div>
                        
                      </div>

                      <div className="info-treinamento-card">
                        <div className="instructor"><FontAwesomeIcon icon={faUserTie} color={roxo}/>&nbsp;&nbsp;&nbsp;Prof. {treinamento.instructor}</div>
                        <div className="wokrload"><FontAwesomeIcon icon={faClock} color={roxo}/>&nbsp;&nbsp;{treinamento.workload} minutos</div>

                      </div>
                      <div className="fundo-card-treinamento">
                        <div className="date1">{treinamento.startDate}</div>
                          <FontAwesomeIcon icon={faArrowAltCircleRight} color={roxo}/> 
                        <div className="date2">{treinamento.endDate}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className='sem-treinamentos' style={{ display: 'flex' }}>
                <p className="mensagem-sem-treinamento">
                  Ainda <span className="destaque-tres">não há treinamentos</span> ou <span className="destaque-dois">os filtros</span> não trouxeram resultados.
                </p>
                <img className='imagem-sem-treinamento' src={semTreinamentos} alt='Imagem simbolizando a ausência de resultados de treinamentos pela busca ou conexão com a API'/>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Treinamentos;
