import "./perfil.css"
import Bannerhome from '../../../components/bannerhome'
import Rodape from '../../../components/rodape'
import TituloPagina from "../../../components/titulopagina";

function Perfil(){

    return(
        <>
            <Bannerhome />
            <TituloPagina titulopagina="Seu perfil" descricaotitulo="Mantenha suas informações sempre atualizadas" tembotao={false} botao="Ver"/>
            <Rodape />
         </>
    )
}

export default Perfil;