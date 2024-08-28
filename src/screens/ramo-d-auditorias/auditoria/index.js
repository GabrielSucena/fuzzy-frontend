import "./auditoria.css";
import TituloPagina from "../../../components/titulopagina";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faPrint, faCodeCommit, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import Carregando from "../../../components/carregando";
import semAuditoria from "../../../../src/semAuditoria.svg"; // Importação da imagem

const token = localStorage.getItem('authToken');
const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
const branco = getComputedStyle(document.documentElement).getPropertyValue('--branco').trim();
const azul = getComputedStyle(document.documentElement).getPropertyValue('--azul').trim();
const verde = getComputedStyle(document.documentElement).getPropertyValue('--verde').trim();
const cinza = getComputedStyle(document.documentElement).getPropertyValue('--cinza-escuro').trim();
const vermelho = getComputedStyle(document.documentElement).getPropertyValue('--vermelho-escuro').trim();

// Função para formatar a data
const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Ação feita em ${day}/${month}/${year} às ${hours}:${minutes}`;
};

function Auditoria({
    titulo = "Auditorias",
    subtitulo = "Veja as modificações no sistema detalhadamente",
    entidade,
    tipo
}) {
    const [auditoria, setAuditoria] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEntity, setFilterEntity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                let fetchUrl = 'http://localhost:8080/auditorias';
                
                console.log(fetchUrl)

                if (entidade && tipo) {
                    fetchUrl += `?${tipo}=${entidade}`;
                }


                console.log("URL: ", fetchUrl)
                
                const response = await fetch(fetchUrl, { 
                    method: 'GET', 
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  
                    } 
                });
                const auditoriaData = await response.json();

                setAuditoria(auditoriaData);
                setRemoveLoading(true);

            } catch (error) {
                console.error("Fetch error:", error);
                setError('Erro ao carregar dados.'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [entidade, tipo]);

    const applyFilters = (items) => {
        return items.filter(item => {
            const matchesSearchTerm =
            (item.course && String(item.course).toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.employee && String(item.employee).toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.user && item.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.reason && item.reason.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesTypeFilter =
                filterType === '' ||
                (filterType === 'inclusao' && !item.removed && !item.changedField) ||
                (filterType === 'alteracao' && !item.removed && item.changedField) ||
                (filterType === 'exclusao' && item.removed);

            const matchesEntityFilter =
                filterEntity === '' ||
                (filterEntity === 'course' && item.course && !item.collaborator) ||
                (filterEntity === 'collaborator' && item.collaborator && !item.course) ||
                (filterEntity === 'both' && (item.course && item.collaborator));

            const matchesDateFilter =
                (!startDate || new Date(item.createdOn) >= new Date(startDate)) && (!endDate || new Date(item.createdOn) <= new Date(endDate));
            return matchesSearchTerm && matchesTypeFilter && matchesEntityFilter && matchesDateFilter;
        });
    };

    const handlePrint = () => {
        const originalContent = document.body.innerHTML;
        const printContent = document.querySelector('.auditorias-content').innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    };

    const agrupar = applyFilters(auditoria);

    return (
        <>
            <TituloPagina 
                titulopagina={titulo} 
                descricaotitulo={subtitulo}
            />
            <div className="auditorias-container">
                <div className="filtros-container">
                    <div className='busca-filtros'>
                        <input
                            className="principal"
                            type="text"
                            placeholder="Busque por ID, gestor(a) ou justificativa"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select 
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Filtro de Tipo selecionado:", value);
                                setFilterType(value);
                            }}
                        >
                            <option value="">Ação</option>
                            <option value="inclusao">Inclusão</option>
                            <option value="alteracao">Alteração</option>
                            {!entidade && <option value="exclusao">Exclusão</option>}
                            
                        </select>
                        <select 
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Filtro de Entidade selecionado:", value);
                                setFilterEntity(value);
                            }}
                        >
                            {tipo === 'course' 
                                ? <option value="course">Apenas o treinamento</option>
                                : tipo === 'collaborator'
                                ? <option value="collaborator">Apenas o colaborador</option>
                                : <option value="">Modo</option>
                            }
                            {!tipo && <option value="course">Cursos</option>}
                            {!tipo && <option value="collaborator">Colaboradores</option>}
                            <option value="both">Colaboradores em treinamentos</option>
                        </select>
                        <div className="date-range-picker">
                            <input
                                className="esquerda"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <input
                                className="direita"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <button className='botao-auditoria' onClick={handlePrint}>
                            <FontAwesomeIcon className="icon" icon={faPrint} color={branco} />&nbsp;&nbsp;&nbsp;Extrair
                        </button>
                    </div>
                </div>
                {loading && (
                    <div className="sem-conexao-colaborador">
                        <Carregando className="div-carregar">Carregando</Carregando>
                    </div>
                )}
                {!removeLoading && (
                    <div className="sem-conexao-colaborador">
                        <img src={semAuditoria} alt="Sem auditoria" />
                    </div>
                )}
                <div className="auditorias-content">
                    {removeLoading && auditoria.length > 0 ? (
                        agrupar.map((auditoriaItem) => (
                            <div key={auditoriaItem.id} className="auditoria-item">
                                <p className="gestor"><strong>Gestor(a):&nbsp;</strong> {auditoriaItem.user}</p>
                                <p className="momento"><strong>{formatDateTime(auditoriaItem.createdOn)}</strong></p>
                                {auditoriaItem.removed && (
                                    <p className="desativado">
                                        <FontAwesomeIcon className="icon" icon={faX} color={vermelho} />
                                        &nbsp;&nbsp;<strong>Desativado: <span className="reason">{auditoriaItem.reason || 'N/A'}</span></strong>
                                    </p>
                                )}
                                {auditoriaItem.changedField  && (
                                    <>
                                        <p>
                                            <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />
                                            &nbsp;&nbsp;<strong>Mudanças:</strong> {auditoriaItem.changedField || 'N/A'}
                                        </p>
                                        <p style={{paddingBottom:'0.25rem'}}>
                                            <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />
                                            &nbsp;&nbsp;<strong>Anteriormente:</strong> {auditoriaItem.oldValues || 'N/A'}
                                        </p>
                                    </>
                                )}
                                {auditoriaItem.collaborator && (
                                    <p style={{paddingBottom:'0.25rem'}}>
                                        <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={azul} />
                                        &nbsp;&nbsp;<strong>Colaborador (ID):</strong> {auditoriaItem.collaborator}
                                    </p>
                                )}
                                {auditoriaItem.course && (
                                    <>
                                        <p style={{paddingBottom:'1rem'}}>
                                            <strong>
                                                <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={verde} />
                                                &nbsp;&nbsp;Treinamento (ID):
                                            </strong> {auditoriaItem.course}
                                        </p>
                                        <p style={{paddingBottom:'0.25rem'}}>
                                            <FontAwesomeIcon className="icon" icon={faCodeCommit} color={cinza} />
                                            &nbsp;&nbsp;<strong>Versão no momento da ação: </strong> {auditoriaItem.courseVersion} (atualmente na versão {Number(auditoriaItem.courseVersion) + 1})
                                        </p>
                                    </>
                                )}
                                <hr className="divisao-auditoria"/>
                            </div>
                        ))
                    ) : (
                       <div className="texto-sem-auditoria"><p className="destaque" style={{textAlign:'center', padding:'2rem 0rem', fontWeight:'bolder', fontSize:'1.5rem'}}>Não há dados disponíveis atualmente.</p></div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Auditoria;
