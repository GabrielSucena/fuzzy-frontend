import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '4px solid #6000B6',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Adicione bordas arredondadas

};




function ModalNotificarTreinamento({ open, handleClose, colaboradores }) {
    const [justificativa, setJustificativa] = useState('');

    const handleConfirm = () => {
        console.log("Enviando notificação aos coloaboradores", colaboradores);
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
                    Notificar treinamento ?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, color: '#565656', }}>
                    Notificar colaborador de todos seus cursos com status à realizar.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleConfirm}>Confirmar</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalNotificarTreinamento