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
import ModalConfirmarExclusãoColaborador from '../modalConfirmarExclusãoColaborador';
import Botao from '../botao/index';
import './tabelamui.css';
import { color } from 'framer-motion';
import { background } from '@chakra-ui/react';
import Teste from '../../screens/ramo-e-estruturais/teste';
import { ExtraiRelatorio } from '../../functionsCenter/functionsCenter';
import PdfSender from '../../screens/ramo-a-treinamentos/pdfsender';
import ModalSelecionarAdd from '../modalSelecionarAdd';
import { useRole } from '../../functionsCenter/RoleContext';
import vazioImg from "../../../src/empty.svg";

const roles = ['Market', 'Finance', 'Development'];
const classifications = ['A', 'B', 'C', 'D'];
const statuses = ['Active', 'Inactive', 'Pending'];



export default function TabelaMUI2({ curso_id, colaboradores,refreshColaboradores }) {

    useEffect(() => {
        if (Array.isArray(colaboradores)) {
            const initialRows = colaboradores.map((colaborador) => ({
                id: colaborador.id,
                name: colaborador.name,
                department: colaborador.department,
                role: colaborador.position,
                classification: colaborador.status,
                status: colaborador.status,
            }));
            setRows(initialRows);
        }
    }, [colaboradores]);

    const [isTesteOpen, setIsTesteOpen] = useState(false);
    const [resetRows, setResetRows] = useState(false);
    const [rows, setRows] = React.useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [confirmedNames, setConfirmedNames] = useState([]);
    const [rejectedNames, setRejectedNames] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const handleOpen = (modalType) => () => setOpenModal(modalType);
    const handleClose = () => setOpenModal(null);
   
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abreModal = () => {
        setIsModalOpen(true);
    };

    // Função para fechar o modal
    const fechaModal = () => {
        setIsModalOpen(false);
    };

    const handleExtrair = () => {
        ExtraiRelatorio({ div: 'box' });
    };

    useEffect(() => {
        if (resetRows) {
            setRows(rows);
            setResetRows(false);
        }
    }, [resetRows, rows]);

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
                        setRejectedNames((prevIds) => [...prevIds, newRow.id]);
                    } else {
                        setRejectedNames((prevIds) =>
                            prevIds.filter((rowId) => rowId !== newRow.id)
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
        console.log(rejectedNames);
        if (rejectedNames.length > 0) {
            const openModalFunction = handleOpen('retirar-colaborador');
            openModalFunction();
        }

        // Resetar os checkboxes
        setRows((prevRows) =>
            prevRows.map((row) => ({
                ...row,
                confirmed: false,
                rejected: false,
            }))
        );
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
        setConfirmedNames([]);
        setRejectedNames([]);
        toggleDeleteIcon();

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

    const { role } = useRole();

    return (
        <>
            {openModal === 'notificar' && (
                <ModalNotificarTreinamento open={true} handleClose={handleClose} colaboradores={"Pedro,João"} />
            )}
            {openModal === 'adicionar-colaborador' && (
                // <ModalAddColaborador id_curso={curso_id} open={true} handleClose={handleClose}  refreshColaboradores={refreshColaboradores} />
                <ModalSelecionarAdd open={true} handleClose={handleClose} curso_id={curso_id}  refreshColaboradores={refreshColaboradores} />
            )}
            {openModal === 'retirar-colaborador' && (
                <ModalConfirmarExclusãoColaborador setRejectedNames={setRejectedNames} setResetRows={setResetRows}
                    colaboradores={rejectedNames} courseId={curso_id} open={true} handleClose={handleClose} refreshColaboradores={refreshColaboradores} />
            )}
            <hr className='divider-treinamento'></hr>
            <p className='titulo-mui2'>Colaboradores envolvidos</p>


                    <DefaultPaper 
                        elevation={2} 
                        square={false} 
                        variant="elevation" 
                        className='lista-colaboradores-dentro'
                    >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                {(role === '[admin]' || '[manager]') && (
                                    <div className='botoes-mui2'>
                                        <Botao color='roxo' onClick={handleOpen('adicionar-colaborador')}>Adicionar</Botao>
                                        <Botao color='branco' onClick={toggleDeleteIcon}>Editar</Botao>
                                        <Botao color='branco' onClick={handleExtrair}>Extrair</Botao>
                                        <Botao color='branco' onClick={handleOpen('notificar')}>Notificar</Botao>
                                    </div>
                                )}
                                            {Object.keys(colaboradores).length === 0 ? (
                <>
                <div className='sem-treinamentos-train-div'>
                    <div className='destaque' style={{backgroundColor:'var(--branco)', color:'var(--roxo)'}}>Oops!</div>
                    <div className='destaque'>Parece que ainda não há colaboradores nesse treinamento.</div>
                    <img
                        src={vazioImg}
                        className='sem-treinamentos-train'
                        alt='Imagem simbolizando que não há treinamentos'
                    />
                </div>

                </>
            ) : (
                <>
                            <Box
                                    className='box'
                                    sx={{
                                        height: 500,
                                        width: '100%',
                                        '& .actions': {
                                            color: 'text.secondary',
                                        },
                                    }}
                                >
                                    <DataGrid
                                        className='linhas'
                                        rows={rows}
                                        columns={columns}
                                        editMode="row"
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={handleRowModesModelChange}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}
                                    />
                                </Box>
                </>)}
    
                            </Grid>
                            <Grid item className='grider' xs={0}>
                                <Grid className='botao-alteracao-dois'>                                    
                                {((role === '[admin]' || role === '[manager]') && Object.keys(colaboradores).length > 0) && <PdfSender id={curso_id} />}
                                </Grid>
                                {showDeleteIcon && (
                                    <Grid className='botao-alteracao'>
                                        <Button onClick={handleSaveAllClick} variant="contained">
                                            Confirmar
                                        </Button>
                                        <Button onClick={handleCancelAllClick} variant="outlined">
                                            Cancelar
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </DefaultPaper>
                
            
        </>

    );
}