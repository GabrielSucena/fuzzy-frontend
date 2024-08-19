import React, { useState } from "react";
import "./modal.css";

function Modal({
    isOpen,
    text,
    mode,
    acaoColaborador,
    acaoDepartamento,
    complement,
    way,
    buttons,
    actions,
    reason,
    onConfirm,
    onClose
}) {
    const [justificativa, setJustificativa] = useState('');

    if (!isOpen) return null; // Renderiza nada se o modal não estiver aberto

    const getModalClassName = () => {
        if (mode === "success") {
            return "var(--verde)";
        } else if (mode === "fail") {
            return "var(--vermelho)";
        } else {
            return "var(--amarelo)";
        }
    };

    const handleConfirm = () => {
        if (reason && justificativa.trim() === '') {
            alert("Por favor, insira uma justificativa.");
            return;
        }
        onConfirm(justificativa); // Passa a justificativa para a função onConfirm
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div 
                className="modal-conteiner" 
                style={{ borderColor: getModalClassName(mode), borderStyle: 'solid', borderWidth: '3px' }}
                onClick={(e) => e.stopPropagation()} // Impede o clique no modal de fechar o modal
            >
                <div className="titulo-modal">
                    {text ? <p>{text}</p> : null}
                </div>

                {way ? (
                    <div className="opcoes">
                        <div className="botoes-popup">
                            <button className="botao-popup" onClick={acaoColaborador}>Por colaborador</button>
                            <button className="botao-popup" onClick={acaoDepartamento}>Por departamento</button>
                        </div>
                    </div>
                ) : null}

                {reason && (
                    <div className="justificativa">
                        <label htmlFor="reason" className="reason">Justificativa:</label>
                        <input
                            id="reason"
                            className="campo-justificativa"
                            type="text"
                            placeholder="Digite AQUI o motivo"
                            value={justificativa}
                            onChange={(e) => setJustificativa(e.target.value)}
                        />
                    </div>
                )}

                <div className="complemento-do-modal">
                    {complement ? <p className="complemento-modal">{complement}</p> : null}
                </div>

                {actions ? (
                    <div className="botoes-modal">
                        {buttons ? (
                            <>
                                <button className="roxo" onClick={handleConfirm}>Confirmar</button>
                                <button className="branco" onClick={onClose}>Cancelar</button>
                            </>
                        ) : (
                            <button className="branco" onClick={onClose}>Cancelar</button>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Modal;
