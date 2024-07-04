import "./auditoria.css"
import Bannerhome from '../../../components/bannerhome'
import Rodape from '../../../components/rodape'
import TituloPagina from "../../../components/titulopagina";

function Auditoria(){

    return(
        <>
        <Bannerhome />
        <TituloPagina titulopagina="Auditorias" descricaotitulo="Visualiação por colaborador e por curso" tembotao={false} botao="Ver"/>
        ate
        <Rodape />
        </>

    )
}

export default Auditoria;