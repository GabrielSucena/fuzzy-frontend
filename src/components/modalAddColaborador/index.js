import { Box, Button, Checkbox, Grid, Modal, TextField, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '4px solid #6000B6',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px', // Adicione bordas arredondadas

};



const roles = ['Market', 'Finance', 'Development'];
const classifications = ['A', 'B', 'C', 'D'];
const statuses = ['Active', 'Inactive', 'Pending'];

const initialRows = Array.from({ length: 5 }, () => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'John Doe',
    department: 'Finance',
    role: 'Market',
    classification: 'A',
    status: 'Inactive',
}));

function ModalAddColaborador({ open, handleClose, courseId }) {

    const navigate = useNavigate();
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});
    const [confirmedNames, setConfirmedNames] = useState([]);

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
                        setConfirmedNames((prevNames) => [...prevNames, newRow.name]);
                    } else {
                        setConfirmedNames((prevNames) =>
                            prevNames.filter((name) => name !== newRow.name)
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
        setRowModesModel((prevModel) => {
            const newModel = { ...prevModel };
            rows.forEach((row) => {
                if (newModel[row.id]?.mode === GridRowModes.Edit) {
                    newModel[row.id].mode = GridRowModes.View;
                }
            });
            return newModel;
        });

        // Resetar os checkboxes
        setRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                confirmed: false,
                rejected: false,
            }))
        );
        console.log('Lista de nomes confirmados:', confirmedNames);

        setConfirmedNames([]); // Certifique-se de que esta linha esteja correta
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
        { field: 'name', headerName: 'Nome', width: 180, editable: false },
        { field: 'department', headerName: 'Departamento', width: 180, editable: false },
        { field: 'role', headerName: 'Cargo', width: 180, editable: false, type: 'singleSelect', valueOptions: roles },
        {
            field: 'actions',
            type: 'actions',
            headerName:'Adicionar'
            ,
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
                            Confirmar                        </Button>
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
    )
}

export default ModalAddColaborador