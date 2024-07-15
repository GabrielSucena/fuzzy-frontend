import "./auditoria.css"
import TituloPagina from "../../../components/titulopagina";

function Auditoria(){

    return(
        <>
        <TituloPagina titulopagina="Auditorias" descricaotitulo="Visualização por colaborador e por curso" tembotao={true} botao="Filtrar"/>
            <div className="colaboradores">
                <div className="colaboradores-card">
                    <i className="fa fa-spinner fa-pulse fa-5x"></i>
                </div>
            </div>
        </>

    )
}

export default Auditoria;