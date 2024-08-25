
import './auditar-treinamento.css';
import Auditoria from '../../ramo-d-auditorias/auditoria';
import {  useParams } from 'react-router-dom';


function AuditarTreinamento( ) {

    const { id } = useParams();
    // X ou XX


    return (
        <>
            <Auditoria
                titulo="Audite este treinamento"
                subtitulo = "Verifique pontualmente a movimentação deste treinamento"
                tipo="course"
                entidade={id}
            />
        </>
    );
}

export default AuditarTreinamento;
