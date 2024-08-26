import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import ModalAddColaborador from '../modalAddColaborador';
import ModalAddColaboradorDepartamento from '../modalAddColaboradorDepartamento';


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




function ModalSelecionarAdd({ open, handleClose, curso_id, refreshColaboradores }) {
    const [justificativa, setJustificativa] = useState('');
    const [openModal, setOpenModal] = useState(null);
    const handleOpen = (modalType) => () => setOpenModal(modalType);

    return (
        <>
            {openModal === 'adicionar-colaborador' && (
                <ModalAddColaborador id_curso={curso_id} open={true} handleClose={handleClose}  refreshColaboradores={refreshColaboradores} />
            )}
            {openModal === 'adicionar-colaborador-departamento' && (
                <ModalAddColaboradorDepartamento id_curso={curso_id} open={true} handleClose={handleClose}  refreshColaboradores={refreshColaboradores} />
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
                        Adicionar Colaborador ?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 10, justifyContent: 'center', width: '100%' }}>
                        <Button variant="contained" onClick={handleOpen('adicionar-colaborador')}>Por colaborador</Button>
                        <Button variant="contained" onClick={handleOpen('adicionar-colaborador-departamento')} >Por departamento</Button>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, marginTop: 10, justifyContent: 'center', width: '100%' }}>
                        <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                    </Box>

                </Box>
            </Modal>
        </>
            )

}

export default ModalSelecionarAdd