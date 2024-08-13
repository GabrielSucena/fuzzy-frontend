import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './auditar-colaborador.css';
import TituloPagina from "../../../components/titulopagina";

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

function AuditarColaborador() {
    const [auditoria, setAuditoria] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterEntity, setFilterEntity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false);
    const { id } = useParams(); // ID do colaborador para filtragem

    useEffect(() => {
        fetch('http://localhost:5000/audits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setAuditoria(data);
        })
        .catch(error => console.error("Fetch error:", error));

        fetch('http://localhost:8080/departamentos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setDepartments(data);
        })
        .catch(error => console.error("Fetch error:", error));

        fetch('http://localhost:8080/posicoes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setJobs(data);
        })
        .catch(error => console.error("Fetch error:", error));
    }, []);

    // Função para encontrar o nome do departamento pelo ID
    const getDepartmentName = (id) => {
        const department = departments.find(dep => dep.id === id);
        return department ? department.department : 'Departamento Desconhecido';
    };

    // Função para encontrar o nome do cargo pelo ID
    const getJobName = (id) => {
        const job = jobs.find(job => job.id === id);
        return job ? job.position : 'Cargo Desconhecido';
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

    // Agrupar os logs de auditoria por id, user, datetime, e reason
    const groupedAuditoria = auditoria.reduce((acc, item) => {
        const key = `${item.uuid}-${item.user}-${item.datetime}-${item.reason}`;
        if (!acc[key]) {
            acc[key] = {
                user: item.user,
                datetime: item.datetime,
                employee_modified: item.employee_modified,
                course_modified: item.course_modified,
                removed: item.removed,
                changes: [],
                reason: item.reason
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

    const handleButtonClick = () => {
        setIsButtonActive(!isButtonActive);
        setFilterEntity(isButtonActive ? '' : 'both');
    };

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
        <TituloPagina titulopagina='Audite este colaborador' descricaotitulo='Verifique pontualmente a movimentação deste colaborador' />
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
                        <option value="exclusao">Remoção em cursos</option>
                    </select>
                    <button
                        className={isButtonActive ? 'active' : 'botao-auditoria'}
                        onClick={handleButtonClick}
                    >
                        Em cursos
                    </button>
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
                    if (item.employee_modified !== id) {
                        return null;
                    }

                    const empId = item.employee_modified;
                    const courseId = item.course_modified;
                    const empDisplayId = empId ? empId.slice(0, 2) + empId.slice(-2) : '';
                    const courseDisplayId = courseId ? courseId.slice(0, 2) + courseId.slice(-2) : '';

                    return (
                        <div key={index} className="auditoria-item">
                            <p>Usuário(a) <strong>{item.user}</strong></p>
                            <p>{formatDateTime(item.datetime)}</p>
                            <p>Justificativa: {item.reason}</p>
                            {empId && (
                                <p>
                                    Colaborador {item.removed === 'S' ? 'removido' : (item.removed === 'N' ? 'incluído' : 'alterado')}: {empDisplayId}
                                </p>
                            )}
                            {courseId && (
                                <p>
                                    Curso {item.removed === 'S' ? 'removido' : (item.removed === 'N' ? 'incluído' : 'alterado')}: {courseDisplayId}
                                </p>
                            )}
                            {item.changes.length > 0 && item.changes.map((change, index) => (
                                <div key={index}>
                                    {change.field === 'Departamento' ? (
                                        <p>Alterou {change.field} para {getDepartmentName(change.field_value)}</p>
                                    ) : change.field === 'Cargo' ? (
                                        <p>Alterou {change.field} para {getJobName(change.field_value)}</p>
                                    ) : (
                                        <p>Alterou {change.field} para {change.field_value}</p>
                                    )}
                                </div>
                            ))}
                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}

export default AuditarColaborador;
