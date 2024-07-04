import "./auditoria.css"
import Bannerhome from '../../../components/bannerhome'
import Rodape from '../../../components/rodape'
import TituloPagina from "../../../components/titulopagina";
import Card from "../../../components/card";

function Auditoria(){

    return(
        <>
        <Bannerhome />
        <TituloPagina titulopagina="Auditorias" descricaotitulo="Visualiação por colaborador e por curso" tembotao={false} botao="Ver"/>
        <div className='home-content'>
            <Card tipo="Por treinamento" descricao="Auditorias de treinamentos"/>
            <Card tipo="Por colaborador" descricao="Auditorias de colaboradores"/>
      </div>
        <Rodape />
        </>

    )
}

export default Auditoria;