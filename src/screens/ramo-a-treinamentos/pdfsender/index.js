import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './pdfsender.css';
import Botao from '../../../components/botao/index';
import { faCircleExclamation, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

function PdfSender() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false); // Novo estado para controlar a tela de confirmação

    const token = localStorage.getItem('authToken');

    // Reset states
    const resetState = () => {
        setSelectedFile(null);
        setUploadResponse(null);
        setIsConfirmed(false);
        setStatusMessage('');
        setShowConfirmation(false); // Reseta a visualização da tela de confirmação
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: '.pdf',
        onDrop: acceptedFiles => {
            setSelectedFile(acceptedFiles[0]);
            console.log('Arquivo selecionado:', acceptedFiles[0]);
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log('Arquivo selecionado:', file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                console.log('Enviando arquivo...');
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Resposta recebida:', response.data);
                setUploadResponse(response.data);
                setIsConfirmed(false); // Reseta a confirmação
                setStatusMessage(''); // Limpa a mensagem de status
                setShowConfirmation(true); // Mostra a tela de confirmação
            } catch (error) {
                console.error('Erro ao enviar arquivo:', error);
            }
        }
    };

    const handleConfirm = async () => {
        console.log('Resultado confirmado:', uploadResponse);

        if (uploadResponse && uploadResponse.records) {
            try {
                console.log('Enviando dados para o servidor...');
                await axios.patch(
                    'http://localhost:8080/cursos/101/registros',
                    {
                        body: uploadResponse.records
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                console.log('Dados enviados com sucesso');
                setStatusMessage('Dados enviados com sucesso!');
                // Gerar animação após a confirmação
                setTimeout(() => {
                    const messageElement = document.querySelector('.status-message');
                    if (messageElement) {
                        messageElement.classList.add('show');
                        setTimeout(() => {
                            messageElement.classList.add('move-right');
                            setTimeout(() => {
                                setStatusMessage('');
                                messageElement.classList.remove('show', 'move-right');
                            }, 3000); // Tempo total de exibição (3 segundos)
                        }, 1000); // Tempo de centralização (1 segundo)
                    }
                }, 500); // Tempo de atraso (0.5 segundos)
                resetState(); // Reseta o estado do modal ao fechar
                setIsOpen(false); // Fecha o modal após o envio bem-sucedido
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
            }
        }
    };

    const handleCancel = () => {
        if (showConfirmation) {
            // Retorna à tela anterior no modal
            setShowConfirmation(false);
        } else {
            // Fecha o modal completamente
            setIsOpen(false);
            resetState(); // Reseta o estado do modal ao fechar
        }
    };

    const vermelhoEscuro = getComputedStyle(document.documentElement).getPropertyValue('--vermelho-escuro').trim();
    const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();

    // Função para formatar os registros para exibição com ícones
    const formatrecords = (records) => {
        return records.map((reg) => (
            <div key={reg} className="register-item">
                <FontAwesomeIcon className="icon" icon={faCircleChevronRight} color={roxo} />
                &nbsp;{reg}
            </div>
        ));
    };

    return (
        <>
            <button className='botao-pdf' onClick={() => {
                setIsOpen(true);
                resetState(); // Reseta o estado ao abrir o modal
            }}>
                Anexar PDF
            </button>

            {isOpen && (
                <div className='modal-overlay-pdf'>
                    <div className='modal-content-pdf'>
                        {!showConfirmation ? (
                            <form className='form-pdf' onSubmit={handleSubmit}>
                                <h3 className='titulo-pdf'>Anexe seu PDF</h3>
                                <h4 className='titulo-pdf2'>Essa ação atualizará todas as frequências dos colaboradores que realizaram o curso.</h4>

                                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                                    <input {...getInputProps()} />
                                    <p>{isDragActive ? "Solte o arquivo aqui" : "Arraste e solte seu PDF aqui, ou clique para selecionar"}</p>
                                </div>
                                <input 
                                    id="file-upload"
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={handleFileChange}
                                    className='input-pdf'
                                />

                                {selectedFile && (
                                    <div className='selected-file'>
                                        <h4 className='titulo-pdf3'>
                                            <FontAwesomeIcon icon={faCircleExclamation} color={vermelhoEscuro} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;Certifique-se que o arquivo contém os registros dos colaboradores do curso atual posicionado.
                                        </h4>
                                        <p className='selecionado'>{selectedFile.name}</p>
                                    </div>
                                )}

                                <div className='botoes-pdf'>
                                    <Botao color='roxo' type="submit">Enviar</Botao>
                                    <Botao color='branco' onClick={handleCancel}>Voltar</Botao>
                                </div>
                            </form>
                        ) : (
                            <div className='modal-overlay-pdf'>
                                <div className='modal-content-pdf'>
                                    <h2 className='titulo-atualizacao'>Resultado da Análise</h2>
                                    <p className='texto-atualizacao'>Os colaboradores abaixo terão seu status alterado para "Realizado":</p>
                                    {uploadResponse && uploadResponse.records && (
                                        <pre className='lista-att'>{formatrecords(uploadResponse.records)}</pre>
                                    )}
                                    <div className='modal-buttons'>
                                        <Botao color='roxo' onClick={handleConfirm}>Confirmar</Botao>
                                        <Botao color='branco' onClick={handleCancel}>Cancelar</Botao>
                                    </div>
                                </div>
                            </div>
                        )}

                        {statusMessage && (
                            <div className="status-message">
                                {statusMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default PdfSender;
