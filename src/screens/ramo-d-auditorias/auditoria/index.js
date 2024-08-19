import "./auditoria.css";
import TituloPagina from "../../../components/titulopagina";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faPrint } from '@fortawesome/free-solid-svg-icons';
import Carregando from "../../../components/carregando";
import semAuditoria from "../../../../src/semAuditoria.svg"; // Importação da imagem

const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
const branco = getComputedStyle(document.documentElement).getPropertyValue('--branco').trim();

// Função para formatar a data
const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Ação feita em ${day}/${month}/${year} às ${hours}:${minutes}.`;
};

function Auditoria({
    titulo = "Auditorias",
    subtitulo = "Veja as modificações no sistema detalhadamente",
    entidade,
    tipo
}) {
    const [auditoria, setAuditoria] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEntity, setFilterEntity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true); // Adiciona o estado de carregamento
    const [removeLoading, setRemoveLoading] = useState(false);
    const [error, setError] = useState(null); // Adiciona o estado de erro

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Define o estado de carregamento como verdadeiro ao iniciar a requisição
    
            try {
                let fetchUrl = 'http://localhost:5000/audits';
    
                if (entidade && tipo) {
                    fetchUrl += `?${tipo}=${entidade}`;
                }
    
                // Inicia todas as requisições e aguarda a conclusão
                const [auditoriaResp] = await Promise.all([
                    fetch(fetchUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
                ]);

                // Processa a resposta de auditoria
                const auditoriaData = await auditoriaResp.json();
                setAuditoria(auditoriaData);
                setRemoveLoading(true); // Define removeLoading como true se a requisição de auditoria for bem-sucedida
    
    
            } catch (error) {
                console.error("Fetch error:", error);
                setError('Erro ao carregar dados.'); // Define uma mensagem de erro
            } finally {
                setLoading(false); // Define o estado de carregamento como falso quando os dados são carregados ou ocorre um erro
            }
        };
    
        fetchData();
    }, [entidade, tipo]);
 

    // Função para encontrar o nome do departamento pelo ID
    const getDepartmentName = (id) => {
        const department = departments.find(dep => dep.id === id);
        return department ? department.department : 'Desconhecido';
    };

    // Função para encontrar o nome do cargo pelo ID
    const getJobName = (id) => {
        const job = jobs.find(job => job.id === id);
        return job ? job.position : 'Desconhecido';
    };

    // Função para aplicar os filtros de busca, tipo, entidade e intervalo de datas
    const applyFilters = (items) => {
        return items.filter(item => {
            const matchesSearchTerm = (item.user && item.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.employee_modified && item.employee_modified.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.course_modified && item.course_modified.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.reason && item.reason.toLowerCase().includes(searchTerm.toLowerCase())) || // Inclusão da busca por justificativa
                item.changes.some(change => 
                    (change.field === 'Nome' && change.field_value.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (change.field === 'E-mail' && change.field_value.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (change.field === 'Registro' && change.field_value.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (change.field === 'Departamento' && getDepartmentName(change.field_value).toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (change.field === 'Cargo' && getJobName(change.field_value).toLowerCase().includes(searchTerm.toLowerCase()))
                );

            const matchesTypeFilter = filterType === '' ||
                (filterType === 'inclusao' && item.removed === 'N') ||
                (filterType === 'alteracao' && item.removed === '') ||
                (filterType === 'exclusao' && item.removed === 'S');

            const matchesEntityFilter = filterEntity === '' ||
                (filterEntity === 'course_modified' && item.course_modified) ||
                (filterEntity === 'employee_modified' && item.employee_modified) ||
                (filterEntity === 'both' && (item.course_modified && item.employee_modified));

            const matchesDateFilter = (!startDate || new Date(item.datetime) >= new Date(startDate)) &&
                (!endDate || new Date(item.datetime) <= new Date(endDate));

            return matchesSearchTerm && matchesTypeFilter && matchesEntityFilter && matchesDateFilter;
        });
    };

    // Agrupar os logs de auditoria por uuid, user, datetime e reason
    const groupedAuditoria = auditoria.reduce((acc, item) => {
        const key = `${item.uuid}-${item.user}-${item.datetime}-${item.reason}-${item.course_modified}-${item.employee_modified}`;
        if (!acc[key]) {
            acc[key] = {
                uuid: item.uuid,
                user: item.user,
                datetime: item.datetime,
                reason: item.reason,
                removed: item.removed,
                course_modified: item.course_modified,
                employee_modified: item.employee_modified,
                changes: []
            };
        }
        if (item.removed !== 'S') {
            acc[key].changes.push({
                field: item.field,
                field_value: item.field_value
            });
        }
        return acc;
    }, {});

    const groupedAuditoriaArray = applyFilters(Object.values(groupedAuditoria));

    // Função para imprimir o conteúdo filtrado
    const handlePrint = () => {
        const originalContent = document.body.innerHTML;
        const printContent = document.querySelector('.auditorias-content').innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Para recarregar a página e restaurar o conteúdo original
    };

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
                            placeholder="Buscar por nome, ID ou justificativa"
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
                            <option value="exclusao">Exclusão</option>
                        </select>
                        <select 
                            onChange={(e) => {
                                const value = e.target.value;
                                console.log("Filtro de Entidade selecionado:", value);
                                setFilterEntity(value);
                            }}
                        >
                            <option value="">Modo</option>
                            <option value="course_modified">Cursos</option>
                            <option value="employee_modified">Colaboradores</option>
                            <option value="both">Ambos</option>
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
                {!removeLoading && (
                    <div className="sem-conexao-colaborador">
                        
                        <Carregando className="div-carregar" >Carregando</Carregando>
            
                    </div>
                )}
                <div className="auditorias-content">
                    {removeLoading ? (
                        groupedAuditoriaArray.length > 0 ? (
                            groupedAuditoriaArray.map((item, index) => (
                                <div key={index} className="auditoria-item">
                                    <p className="topo-auditoria">Usuário(a) <strong>{item.user.toUpperCase()}</strong></p>
                                    <p className="topo-auditoria">
                                        <strong>
                                            {item.course_modified ? `ID do treinamento: ${item.course_modified}` : `ID (Registro Sanofi) do colaborador: ${item.employee_modified}`}
                                        </strong>
                                    </p>
                                    <p className="topo-auditoria">{formatDateTime(item.datetime)}</p>
                                    <p className="topo-auditoria-justificativa"><b>{item.reason}</b></p>
                                    {item.removed === 'S' ? (
                                        <p>
                                            {item.employee_modified && (
                                                <span className="remocao-auditoria">
                                                    <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />&nbsp;&nbsp;Colaborador removido: {item.employee_modified}
                                                </span>
                                            )}
                                            {item.course_modified && (
                                                <span className="remocao-auditoria">
                                                    <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />&nbsp;&nbsp;Curso removido: {getDepartmentName(item.course_modified)}
                                                </span>
                                            )}
                                        </p>
                                    ) : (
                                        <div>
                                            {item.changes.map((change, idx) => (
                                                <p className="bullet" key={idx}>
                                                    <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />&nbsp;&nbsp;{change.field}: {change.field_value}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    <hr className="divisao-auditoria"/>
                                </div>
                            ))
                        ) : (
                            <div className="auditoria-vazio">
                                <p className="mensagem-auditoria-vazio">Ainda não há auditoria pois não foram realizadas ações.</p>
                                <img src={semAuditoria} alt="Ícone simbolizando a falta de auditoria." className="sem-auditoria" />
                                </div>
                        )
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Auditoria;
