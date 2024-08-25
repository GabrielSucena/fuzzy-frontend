
import './auditar-colaborador.css';
import Auditoria from '../../ramo-d-auditorias/auditoria';
import { useLocation, useParams } from 'react-router-dom';


function AuditarColaborador( ) {

    const { id } = useParams();
    // X ou XX

    const register = new URLSearchParams(useLocation().search).get('register');
    // XXXXX


    return (
        <>
            <Auditoria
                titulo="Audite este colaborador"
                subtitulo = "Verifique pontualmente a movimentação deste colaborador"
                tipo="collaborator"
                entidade={id}
            />
        </>
    );
}

export default AuditarColaborador;
