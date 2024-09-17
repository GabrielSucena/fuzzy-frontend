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
    bgcolor: 'background.paper',
    border: '4px solid #6000B6',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Adicione bordas arredondadas
    overflow: 'auto', // Adicione rolagem se necessário
};




function ModalJustificativaTreinamento({ open, handleClose, courseId, cursoInfo }) {
   
    const navigate = useNavigate();

    const [justificativa, setJustificativa] = useState('');
    const token = localStorage.getItem('authToken');

    const handleConfirm = async (justificativa) => {
        
        // Inclui o motivo no cursoInfo
        const updatedCursoInfo = {
            ...cursoInfo,
            reason: justificativa
        };
        console.log("Curso Info Atualizado:", updatedCursoInfo);
        console.log("Motivo: ", cursoInfo)
        console.log("Motivo: ", courseId)


        try {
            const response = await fetch(`${url}/cursos/${courseId}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedCursoInfo),
            });
            if (response.ok) {
              navigate(`/treinamentos/${courseId}`);
            } else {
              console.error("Erro ao enviar os dados:", response.statusText);
            }
          } catch (error) {
            console.error("Erro ao enviar os dados:", error);
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
                    Editar treinamento ?
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
                    Essa ação irá editar o treinamento atual e incrementar a versão.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
                <Button 
                    variant="contained" 
                    onClick={() => handleConfirm(justificativa)}
                    >
                    Confirmar
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalJustificativaTreinamento