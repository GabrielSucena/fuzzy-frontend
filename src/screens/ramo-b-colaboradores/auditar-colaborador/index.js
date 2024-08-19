
import './auditar-colaborador.css';
import Auditoria from '../../ramo-d-auditorias/auditoria';
import { useParams } from 'react-router-dom';


function AuditarColaborador( ) {

    const { id } = useParams(); // ID do colaborador para filtragem



    return (
        <>
            <Auditoria
                titulo="Audite este colaborador"
                subtitulo = "Verifique pontualmente a movimentação deste colaborador"
                tipo="employee_modified"
                entidade={id}
            />
        </>
    );
}

export default AuditarColaborador;
