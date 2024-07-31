import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React from 'react'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #6000B6',
    boxShadow: 24,
    p: 4,
  };
  



function ModalObsoletarTreinamento({open, handleClose}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Obsoletar treinamento ?
                </Typography>
                <TextField
                    fullWidth
                    id="Justificativa"
                    label="Justificativa"
                    variant="outlined"
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Essa ação inativará o treinamento atual e congelará o histórico atual.
                </Typography>

                <Button variant="contained">Confirmar</Button>
                <Button variant="outlined">Cancelar</Button>

            </Box>
        </Modal>
    )
}

export default ModalObsoletarTreinamento