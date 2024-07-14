import React from "react";
import './modal.css';
import Botao from "../botao";

function Modal({
    justificativa = '',
    titulomodal = 'Título do modal',
    descricaomodal = 'Descrição modal',
    destinoconfirmar = '/confirmar',      destinocancelar = '/cancelar',
    destino1 = '/modalporcolaborador',   destino2 = '/modalportreinamento',
    acaoBotao = (e) => {
        e.preventDefault();
        console.log("Ação padrão ativada!");
    }
}) {

    return (
        <>
            {justificativa === '' ? (
                <form className="modal" onSubmit={acaoBotao}>
                    <p className="titulomodal">{titulomodal}</p>
                    <div className="botoesmodal">
                        <Botao destino={destino1} color="roxo">Por colaborador</Botao>
                        <Botao destino={destino2} color="roxo">Por treinamento</Botao>
                    </div>
                    <div className="botoespopup">
                        <Botao type='reset' color="branco">Cancelar</Botao>
                    </div>
                </form>
            ) : (
                <form className="modal" onSubmit={acaoBotao}>
                    <p className="titulomodal">{titulomodal}</p>
                    <div className="justificativa">
                        <input type="text" placeholder={justificativa} />
                    </div>
                    <p className="descricaomodal">{descricaomodal}</p>
                    <div className="botoespopup">
                        <Botao destino={destinoconfirmar} type='submit' color="roxo">Confirmar</Botao>
                        <Botao destino={destinocancelar} type='reset' color="branco">Cancelar</Botao>
                    </div>
                </form>
            )}
        </>
    );
}

export default Modal;
