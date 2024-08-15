import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DefaultPaper from '../defaultPaper';
import ModalNotificarTreinamento from '../modalNotificarTreinamento';
import TituloPagina from '../titulopagina';
import ModalAddColaborador from '../modalAddColaborador';

const roles = ['Market', 'Finance', 'Development'];
const classifications = ['A', 'B', 'C', 'D'];
const statuses = ['Active', 'Inactive', 'Pending'];



export default function TabelaMUI2({ colaboradores }) {
    useEffect(() => {
        if (Array.isArray(colaboradores)) {
            const initialRows = colaboradores.map((colaborador) => ({
                id: colaborador.id,
                name: colaborador.name,
                department: colaborador.department,
                role: colaborador.job,
                classification: colaborador.shortened_name_criticality,
                status: colaborador.status,
            }));
            setRows(initialRows);
        }
    }, [colaboradores]);

    const [rows, setRows] = React.useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [confirmedNames, setConfirmedNames] = useState([]);
    const [rejectedNames, setRejectedNames] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const handleOpen = (modalType) => () => setOpenModal(modalType);
    const handleClose = () => setOpenModal(null);

    //Habilitar o edit da tabela
    const [showDeleteIcon, setShowDeleteIcon] = React.useState(false);

    const toggleDeleteIcon = () => {
        setShowDeleteIcon(prev => !prev);
    };

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

    const handleRejectClick = (id) => () => {
        setRows((prevRows) =>
            prevRows.map((row) => {
                if (row.id === id) {
                    const newRow = { ...row, rejected: !row.rejected };
                    if (newRow.rejected) {
                        setRejectedNames((prevNames) => [...prevNames, newRow.name]);
                    } else {
                        setRejectedNames((prevNames) =>
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
        console.log('Lista de nomes rejeitados:', rejectedNames);
        toggleDeleteIcon();
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
        { field: 'classification', headerName: 'Classificação', width: 180, editable: true, type: 'singleSelect', valueOptions: classifications },
        { field: 'status', headerName: 'Status', width: 180, editable: false, type: 'singleSelect', valueOptions: statuses },
        showDeleteIcon ? {
            field: 'actions',
            type: 'actions',
            headerName: 'Ações',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const row = rows.find((row) => row.id === id);
                return showDeleteIcon ? [
                    <GridActionsCellItem
                        icon={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={row?.confirmed || false} sx={{ color: 'success.main' }} />
                                <CheckIcon sx={{ color: 'success.main' }} />
                            </Box>
                        }
                        label="Confirm"
                        onClick={handleConfirmClick(id)}
                        aria-label="Confirm"
                    />,
                    <GridActionsCellItem
                        icon={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox checked={row?.rejected || false} sx={{ color: 'error.main' }} />
                                <DeleteIcon sx={{ color: 'error.main' }} />
                            </Box>
                        }
                        label="Reject"
                        onClick={handleRejectClick(id)}
                        aria-label="Reject"
                    />,
                ] : [];
            },
        } : {},
    ];

    return (
        <>
            {openModal === 'notificar' && (
                <ModalNotificarTreinamento open={true} handleClose={handleClose} colaboradores={"Pedro,João"} />
            )}
            {openModal === 'adicionar-colaborador' && (
                <ModalAddColaborador open={true} handleClose={handleClose} colaboradores={"Pedro,João"} />
            )}

            <TituloPagina
                titulopagina={"Colaboradores Envolvidos"}
                botao1="Adicionar"
                botao2="Editar"
                botao3="Notificar"
                color1="roxo"
                color2="branco"
                color3="branco"
                onClick1={handleOpen('adicionar-colaborador')}
                onClick2={toggleDeleteIcon}
                onClick3={handleOpen('notificar')}
            />
            <DefaultPaper elevation={2} square={false} variant="elevation">
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
                    <Grid item xs={6}></Grid>
                    {showDeleteIcon && (
                        <>
                            <Grid item xs={3} md={3} lg={3}>
                                <Button onClick={handleSaveAllClick} variant="contained">
                                    Salvar Alterações
                                </Button>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3}>
                                <Button onClick={handleCancelAllClick} variant="outlined">
                                    Cancelar
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </DefaultPaper>
        </>

    );
}