import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import url from '../../functionsCenter/urlController'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // Largura responsiva
    maxWidth: 600, // Largura máxima
    overflow: 'auto', // Adicione rolagem se necessário
    bgcolor: 'background.paper',
    border: '4px solid #6000B6',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Adicione bordas arredondadas
};

const token = localStorage.getItem('authToken');

function ModalNotificarTreinamento({ open, handleClose, id }) {
    const [justificativa, setJustificativa] = useState('');

    const handleConfirm = (id) => {
        fetch(`${url}/emailsender/curso/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(`Erro enviando email: ${resp.status}`);
                }
                
            })
            .then(data => {
                console.log('Email enviado com sucesso:', data);
                handleClose(); // Fechar o modal após confirmar (movido para o local correto)
            })
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
                    Notificar colaboradores?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, color: '#565656', }}>
                    Essa ação irá notificar todos os colaboradores com cursos não realizados!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={() => handleConfirm(id)}>Confirmar</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default ModalNotificarTreinamento;
