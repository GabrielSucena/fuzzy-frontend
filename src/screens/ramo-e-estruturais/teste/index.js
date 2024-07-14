import { DoDisturb } from "@mui/icons-material";
import React, { useState } from "react";
import "./teste.css";

function Teste() {
    const [campo1, setCampo1] = useState('');
    const [campo2, setCampo2] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const jsonOutput = {
            id: Number(campo1),
            campo: campo2
        };

        console.log(jsonOutput);
    };

    return (
        <form id="customForm" onSubmit={handleFormSubmit}>
            <label htmlFor="campo1">Campo 1:</label>
            <input
                type="text"
                id="campo1"
                value={campo1}
                onChange={(e) => setCampo1(e.target.value)}
                required
            />

            <label htmlFor="campo2">Campo 2:</label>
            <input
                type="text"
                id="campo2"
                value={campo2}
                onChange={(e) => setCampo2(e.target.value)}
                required
            />

            <button type="submit">
                <DoDisturb />
                Enviar
            </button>
        </form>
    );
}

export default Teste;
