import React from "react";
import "./adiciona-colaborador.css";
import Bannerhome from '../../../components/bannerhome';
import Rodape from '../../../components/rodape';
//import TituloPagina from '../../../components/titulopagina'

function CadastroColaborador() {
    return (
        <>
            <Bannerhome />
            {/*<TituloPagina titulopagina="Adicionar colaborador" descricaotitulo="Preencha os campos para salvar"/>*/}
            <div className="conteiner-cadastro">
                <div className="quadrado-cadastro">
                    <form action="/add-cadastro" method="post" className="campos">
                        <div className="campo">
                            <label htmlFor="name_employee">Nome completo</label>
                            <input type="text" id="name_employee" name="name_employee" autoComplete="name" />
                        </div>
                        <div className="campo">
                            <label htmlFor="id_job">Cargo</label>
                            <select id="id_job" name="id_job" autoComplete="organization-title">
                                <option value="1">Analista Químico I</option>
                                <option value="2">Analista Químico II</option>
                                <option value="3">Analista Químico III</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="id_department">Departamento</label>
                            <select id="id_department" name="id_department" autoComplete="organization">
                                <option value="1">Saúde</option>
                                <option value="2">Recursos Humanos</option>
                                <option value="3">Biomedicina</option>
                            </select>
                        </div>
                        <div className="campo">
                            <label htmlFor="id_employee">Registro</label>
                            <input type="number" id="id_employee" name="id_employee" autoComplete="off" />
                        </div>
                        <div className="campo">
                            <label htmlFor="email">E-mail</label>
                            <input type="email" id="email" name="email" autoComplete="email" />
                        </div>
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
