import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


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




function ModalObsoletarTreinamento({ open, handleClose, courseId }) {
   
    const navigate = useNavigate();

    const [justificativa, setJustificativa] = useState('');

    const handleConfirm = async () => {
        if (!justificativa) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/cursos/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Curso removido com sucesso');
                // Adicione lógica adicional aqui se necessário
                handleClose(); // Fechar o modal após confirmar
                navigate("/treinamentos");

            } else {
                console.error('Erro ao remover curso');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }


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
                    Obsoletar treinamento ?
                </Typography>
                <TextField
                    required
                    fullWidth
                    id="Justificativa"
                    label="Justificativa"
                    variant="outlined"
                    value={justificativa}
                    onChange={(e) => setJustificativa(e.target.value)}
                />
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, color: '#565656', }}>
                    Essa ação inativará o treinamento atual e congelará o histórico atual.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleConfirm}>Confirmar</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalObsoletarTreinamento