import { DoDisturb } from "@mui/icons-material";
import React, { useState } from "react";
import "./teste.css";
import Modal from "../../../components/modal";

function Teste() {


    return (
        <>
            <Modal
                    success={true}
                    complement={"Notificar todos os colaboradores com status à realizar"}
                    actions={true} buttons={true}
                    text="Notificar colaboradores?" />

                                <Modal
                    buttons={false} actions={true}
                    text="Adicionar colaboradores?"
                    way={true}           
/>
                    

                                <Modal
                    reason={true}
                    complement={"Esse(a) colaborador(a) será excluído(a) da lista de colaboradores."}
                    actions={true} buttons={true}
                    text="Excluir colaborador(a)?"/>
                                                    <Modal
                    complement={"Esse(a) colaborador(a) foi excluído(a) com sucesso."}
                    mode="success"
                    text="Exclusão"/>
        </>
        
    );
}

export default Teste;
