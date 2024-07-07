import React from "react";
import "./adiciona-colaborador.css";
import Bannerhome from '../../../components/bannerhome';
import Rodape from '../../../components/rodape';
import TituloPagina from "../../../components/titulopagina";
//import TituloPagina from '../../../components/titulopagina'

function CadastroColaborador() {

    function PostColaborador(e){
        e.preventDefault()
        console.log("Ativei!")
    }

    return (
        <>
            <Bannerhome />
            <TituloPagina
                titulopagina="Adicionar colaborador"
            />
            <div className="conteiner-cadastro">
                <div className="quadrado-cadastro">
                    <form className="campos" onSubmit={PostColaborador}>
                        <input type="text" placeholder="Nome completo" />
                        <select name="job" id="job">
                            <option value="Analista Químico I">Analista Químico I</option>
                            <option value="Analista Químico II">Analista Químico II</option>
                            <option value="Analista Químico III">Analista Químico III</option>
                        </select>
                        <select name="department" id="department">
                            <option value="Saúde">Saúde</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                            <option value="Biomedicina">Biomedicina</option>
                        </select>
                        <input type="number" placeholder="Registro ID" />
                        <input type="email" placeholder="Digite seu e-mail" />
                        <div className="button-cadastro">
                            <button type="submit">Confirmar</button>
                        </div>
                        <div className="button-cadastro">
                            <button type="reset">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Rodape />
        </>
    );
}

export default CadastroColaborador;
