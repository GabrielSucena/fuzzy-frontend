import "./auditoria.css";
import TituloPagina from "../../../components/titulopagina";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight  } from '@fortawesome/free-solid-svg-icons';

const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();
// Função para formatar a data
const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `Ação feita em ${year}/${month}/${day} às ${hours}:${minutes}.`;
};

function Auditoria() {
    const [auditoria, setAuditoria] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEntity, setFilterEntity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        // Fetch auditorias
        fetch('http://localhost:5000/audits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Auditoria pega:", data);
            setAuditoria(data);
        })
        .catch(error => console.error("Fetch error:", error));

        // Fetch departments
        fetch('http://localhost:8080/departamentos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Departamentos pegos:", data);
            setDepartments(data);
        })
        .catch(error => console.error("Fetch error:", error));

        // Fetch jobs
        fetch('http://localhost:8080/posicoes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Cargos pegos:", data);
            setJobs(data);
        })
        .catch(error => console.error("Fetch error:", error));
    }, []);

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
                (filterType === 'alteracao' && item.removed !== 'N' && item.removed !== 'S') ||
                (filterType === 'exclusao' && item.removed === 'S');

            const matchesEntityFilter = filterEntity === '' ||
                (filterEntity === 'course' && item.course_modified) ||
                (filterEntity === 'employee' && item.employee_modified) ||
                (filterEntity === 'both' && item.course_modified && item.employee_modified);

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
                course: item.course_modified,
                employee: item.employee_modified,
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
                titulopagina="Auditorias" 
                descricaotitulo="Audite as ações realizadas no sistema com alguns cliques"
            />
            <div className="auditorias-container">
                <div className="filtros-container">
                    <div className='buscas'>
                        <input
                            className="principal"
                            type="text"
                            placeholder="Buscar por nome, ID ou justificativa"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select onChange={(e) => setFilterType(e.target.value)}>
                            <option value="">Ação</option>
                            <option value="inclusao">Inclusão</option>
                            <option value="alteracao">Alteração</option>
                            <option value="exclusao">Exclusão</option>
                        </select>
                        <select onChange={(e) => setFilterEntity(e.target.value)}>
                            <option value="">Modo</option>
                            <option value="course">Cursos</option>
                            <option value="employee">Colaboradores</option>
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
                        <button className='botao-auditoria' onClick={handlePrint}>Print</button>
                    </div>
                </div>
<div className="auditorias-content">
    {groupedAuditoriaArray.map((item, index) => {
        {console.log("oi:", item)}
        return (
            <div key={index} className="auditoria-item">
                <p className="topo-auditoria">Usuário(a) <strong>{item.user.toUpperCase()}</strong></p>
                <p className="topo-auditoria">
                    <strong>
                        {item.course ? `ID do treinamento: ${item.course}` : `ID (Registro Sanofi) do colaborador: ${item.employee}`}
                    </strong>
                    </p>
                <p className="topo-auditoria">{formatDateTime(item.datetime)}</p>
                <p className="topo-auditoria-justificativa"><b>{item.reason}</b></p>
                {item.removed === 'S' ? (
                    <p>
                        {item.employee_modified && (
                            <span className="remocao-auditoria">
                                Colaborador removido: {getJobName(item.employee_modified)}
                            </span>
                        )}
                        {item.course_modified && (
                            <span className="remocao-auditoria">
                                Curso removido: {getDepartmentName(item.course_modified)}
                            </span>
                        )}
                    </p>
                ) : (
                    <div >
                        {item.changes.map((change, idx) => (
                            <p className="bullet" key={idx}>
                                <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />&nbsp;&nbsp;{change.field}: {change.field_value}
                            </p>
                        ))}
                    </div>
                )}
                <hr className="divisao-auditoria"/>
            </div>
        );
    })}
</div>

            </div>
        </>
    );
}

export default Auditoria;
