import { Box, Button, Checkbox, Grid, Modal } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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


function ModalAddColaboradorDepartamento({ id_curso, open, handleClose, refreshColaboradores }) {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]); // Inicialize com um array vazio
    const [rowModesModel, setRowModesModel] = useState({});
    const [confirmedNames, setConfirmedNames] = useState([]);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`http://localhost:8080/departamentos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log("Colaboradores fetched:", data);
                setRows(data); // Defina os dados recebidos na requisição como as linhas do DataGrid
            })
            .catch(error => console.error("Fetch error:", error));
    }, []); // O array vazio como segundo argumento garante que o efeito seja executado apenas uma vez

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleConfirmClick = (id) => () => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    const newRow = { ...row, confirmed: !row.confirmed };
                    if (newRow.confirmed) {
                        setConfirmedNames((prevIds) => [...prevIds, newRow.id]); // Adiciona o ID do departamento
                    } else {
                        setConfirmedNames((prevIds) =>
                            prevIds.filter((deptId) => deptId !== newRow.id) // Remove o ID do departamento
                        );
                    }
                    return newRow;
                }
                return row;
            })
        );
    };
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
        );
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };



const handleSaveAllClick = () => {
    const confirmedIds = rows
        .filter((row) => row.confirmed)
        .map((row) => row.id);

    fetch(`http://localhost:8080/cursos/${id_curso}/colaboradores`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ departmentId: confirmedIds }), // Envia IDs dos departamentos confirmados
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

    // Resetar os checkboxes
    setRows((prevRows) =>
        prevRows.map((row) => ({
            ...row,
            confirmed: false,
            rejected: false,
        }))
    );
    console.log('Departamentos confirmados:', confirmedNames);
    handleClose();
    setConfirmedNames([]);
};

    const handleCancelAllClick = () => {
        setRowModesModel((prevModel) => {
            const newModel = { ...prevModel };
            rows.forEach((row) => {
                if (newModel[row.id]?.mode === GridRowModes.Edit) {
                    newModel[row.id] = { mode: GridRowModes.View, ignoreModifications: true };
                }
            });
            return newModel;
        });
    };

    const columns = [
        { field: 'department', headerName: 'Departamento', width: 180, editable: false },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Adicionar',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const row = rows.find((row) => row.id === id);
                return [
                    <GridActionsCellItem
                        icon={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={row?.confirmed || false} sx={{ color: 'black' }} />
                            </Box>
                        }
                        label="Confirm"
                        onClick={handleConfirmClick(id)}
                        aria-label="Confirm"
                    />,
                ];
            },
        },
    ];

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box
                            sx={{
                                height: 500,
                                width: '100%',
                                '& .actions': {
                                    color: 'text.secondary',
                                },
                            }}
                        >
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                editMode="row"
                                rowModesModel={rowModesModel}
                                onRowModesModelChange={handleRowModesModelChange}
                                onRowEditStop={handleRowEditStop}
                                processRowUpdate={processRowUpdate}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Button onClick={handleSaveAllClick} variant="contained">
                            Confirmar
                        </Button>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Button onClick={handleClose} variant="outlined">
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

export default ModalAddColaboradorDepartamento;
