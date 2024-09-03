import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'


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


function ModalDescription({ open, handleClose, description }) {
    const [justificativa, setJustificativa] = useState('');

    const handleConfirm = () => {
        handleClose(); // Fechar o modal após confirmar

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
                    Descrição do treinamento
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, color: '#565656', fontSize:'1.5rem'}}>
                    {description}
                </Typography>
            </Box>
        </Modal>
    )
}

export default ModalDescription