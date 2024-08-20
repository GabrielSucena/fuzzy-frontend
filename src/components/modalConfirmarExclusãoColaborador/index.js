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




function ModalConfirmarExclusãoColaborador({setRejectedNames, colaboradores, open, handleClose, courseId, refreshColaboradores,setResetRows
}) {

    const navigate = useNavigate();

    const [justificativa, setJustificativa] = useState('');

    const handleConfirm = async () => {
        console.log('IDs rejeitados:', colaboradores);

        fetch(`http://localhost:8080/cursos/${courseId}/colaboradores`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ collaboratorsId: colaboradores }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.text(); // ou response.json(), caso a API retorne JSON
            })
            .then((data) => {
                console.log('Requisição bem-sucedida:', data);
                refreshColaboradores(); 
            })
            .catch((error) => {
                console.error('Erro ao fazer a requisição:', error);
            });

        setRejectedNames([]);
        handleClose()
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
                    Excluir Participantes ?
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
                    Essa ação irá retirar os colaboradores selecionados desse treinamento.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" onClick={handleConfirm}>Confirmar</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalConfirmarExclusãoColaborador