import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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




function ModalConfirmarExclusãoColaborador({setRejectedNames, colaboradores, open, handleClose, courseId, refreshColaboradores,setResetRows
}) {

    const navigate = useNavigate();

    const [justificativa, setJustificativa] = useState('');
    const token = localStorage.getItem('authToken');

    const handleConfirm = async (justificativa) => {
        
        console.log("Pré: ", JSON.stringify({reason: justificativa, collaboratorsId: colaboradores}))

        fetch(`${url}/cursos/${courseId}/colaboradores`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({reason: justificativa, collaboratorsId: colaboradores})
            // Quando estiver preparado para a razão
            //body: JSON.stringify({ collaboratorsId: colaboradores, reason: justificativa })
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
                    Excluir participantes?
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
                    <Button variant="contained" onClick={() => handleConfirm(justificativa)}>Confirmar</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalConfirmarExclusãoColaborador