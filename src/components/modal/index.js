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

    /**
 * @function Modal
 * @since 2024
 * @version 4
 * @param {Boolean} isOpen - Se o modal está ativo
 * @param {String} text - Texto inicial do modal
 * @param {Function} acaoColaborador - Ação a ser realizada sobre o colaborador
 * @param {Function} acaoDepartamento - Ação a ser realizada sobre o colaborador
 * @param {String} complement - Texto final do modal
 * @param {Boolean} way - Se há os botões de inclusão
 * @param {Boolean} buttons - Se há os botões de inclusão genéricos
 * @param {Boolean} actions - Botões de fechamento ou confirmação do modal, não deve ser passado se o modal for informativo
 * @param {String} reason - Campo para inclusão de justificativa se a ação for exclusão
 * @param {Function} onConfirm - Ação realizada ao clicar no confirmar do modal
 * @param {Function} onCancel - Ação realizada ao clicar no cancelar do modal
 * @returns {} O elemento (div) em tela.
 * @description Modais do site.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

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
