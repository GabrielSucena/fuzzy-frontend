import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPencil, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal';
import url from '../../functionsCenter/urlController'
import BotaoEditar from '../botaoEditar/botaoEditar';
const token = localStorage.getItem('authToken');
const classifications = ['N/A', 'ME', 'MA', 'C'];
const statuses = ['Realizado', 'À realizar'];

const branco = getComputedStyle(document.documentElement).getPropertyValue('--branco').trim();
const roxo = getComputedStyle(document.documentElement).getPropertyValue('--roxo').trim();


export default function TabelaMUI2({ curso_id, colaboradores, refreshColaboradores }) {
    const { regra } = useRole();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (Array.isArray(colaboradores)) {
            const initialRows = colaboradores.map((colaborador) => ({
                id: colaborador.id,
                name: colaborador.name,
                department: colaborador.department,
                role: colaborador.position,
                classification: colaborador.classification,
                status: colaborador.status,
            }));
            setRows(initialRows);

            const uniqueRoles = [...new Set(colaboradores.map(colaborador => colaborador.position))];
            setRoles(uniqueRoles);
        }
    }, [colaboradores]);

    const [isTesteOpen, setIsTesteOpen] = useState(false);
    const [resetRows, setResetRows] = useState(false);
    const [rows, setRows] = React.useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [confirmedNames, setConfirmedNames] = useState([]);
    const [updatedClassifications, setUpdatedClassifications] = useState([]); // Lista de classificações atualizadas
    const [rejectedNames, setRejectedNames] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const handleOpen = (modalType) => () => setOpenModal(modalType);
    const handleClose = () => setOpenModal(null);
    const [isSaving, setIsSaving] = useState(false);  // Estado para controlar o carregamento
    const [isEditing, setIsEditing] = useState(false); // Estado para controlar o botão

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const openModal2 = () => {
        setModalOpen2(true);
    };
    const handleFecha = (e) => {
        if (e) {
            e.preventDefault(); // Apenas chama preventDefault se e não for undefined
        }
        setModalOpen2(false);
    };
    const handleSendEmail = async () => {
        await fetch(`${url}/emailsender/curso/${curso_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Fecha o modal após a requisição
        handleFecha();
    };

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
        setIsEditing(!isEditing); // Alterna entre "Editar" e "Editando"

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
                    const newRow = { ...row, confirmed: !row.confirmed, rejected: false };  // Desmarca o checkbox 'rejected'
                    if (newRow.confirmed) {
                        setConfirmedNames((prevNames) => [...prevNames, newRow.id]);
                        setRejectedNames((prevIds) => prevIds.filter((rowId) => rowId !== newRow.id));  // Remove o id da lista de rejeitados
                    } else {
                        setConfirmedNames((prevNames) =>
                            prevNames.filter((name) => name !== newRow.id)
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
                    const newRow = { ...row, rejected: !row.rejected, confirmed: false };  // Desmarca o checkbox 'confirmed'
                    if (newRow.rejected) {
                        setRejectedNames((prevIds) => [...prevIds, newRow.id]);
                        setConfirmedNames((prevNames) => prevNames.filter((rowId) => rowId !== newRow.id));  // Remove o id da lista de confirmados
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

    const classificationMapping = {
        'N/A': { classificationId: 1 },
        'ME': { classificationId: 2 },
        'MA': { classificationId: 3 },
        'C': { classificationId: 4 },
    };
    // Função para enviar as atualizações de classificações
    const PatchAttClassification = async () => {
        if (updatedClassifications.length === 0) {
            return; // Não faz a requisição se não houver classificações para atualizar
        }
        try {
            setIsSaving(true);  // Define o estado de carregamento como verdadeiro

            const response = fetch(`${url}/cursos/${curso_id}/colaboradores`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assumindo que o token está no localStorage
                },
                body: JSON.stringify({ updateClassificationAndStatusDtoList: updatedClassifications }),
            });

            if (!response.ok) {
                throw new Error('Failed to update classifications');
            }

            console.log('Requisição:', JSON.stringify({ updateClassificationAndStatusDtoList: updatedClassifications }));
            setUpdatedClassifications([]); // Limpa a lista após o envio
            await refreshColaboradores(); // Atualiza a lista de colaboradores após a requisição
        } catch (error) {
            console.error("Error updating classifications:", error);
        } finally {
            setIsSaving(false);  // Define o estado de carregamento como falso
        }
    };



    // useEffect para executar a requisição quando updatedClassifications mudar
    useEffect(() => {
        if (updatedClassifications.length > 0) {
            PatchAttClassification();
        }
    }, [updatedClassifications]);


    // Função para atualizar a lista de classificações
    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        const originalRow = rows.find(row => row.id === newRow.id);
        if (originalRow.classification !== newRow.classification) {
            const { classificationId } = classificationMapping[newRow.classification];

            // Adiciona ou atualiza a lista de classificações atualizadas
            setUpdatedClassifications(prev => [
                ...prev,
                { collaboratorId: newRow.id, classificationId }
            ]);
        }

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
        console.log('Nomes Confirmados:', confirmedNames);
        console.log('Nomes Rejeitados:', rejectedNames);
        console.log('Classificações Atualizadas:', updatedClassifications);

        if (confirmedNames.length > 0) {
            const updateClassificationAndStatusDtoList = confirmedNames.map((id) => ({
                collaboratorId: id,
                statusId: 1, // Supondo que statusId 2 é o desejado para atualizar o status
            }));

            try {
                setIsSaving(true);  // Define o estado de carregamento como verdadeiro

                fetch(`${url}/cursos/${curso_id}/colaboradores`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Assumindo que o token está no localStorage
                    },
                    body: JSON.stringify({ updateClassificationAndStatusDtoList }),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Erro na requisição de atualização');
                        }
                        console.log('Requisição:', JSON.stringify({ updateClassificationAndStatusDtoList }));
                        refreshColaboradores(); // Atualiza a lista de colaboradores após a requisição
                        setConfirmedNames([]); // Limpa a lista após o envio
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar colaboradores:', error);
                    })
                    .finally(() => {
                        setIsSaving(false);  // Define o estado de carregamento como falso
                    });
            } catch (error) {
                console.error('Erro na requisição:', error);
                setIsSaving(false);  // Define o estado de carregamento como falso
            }
        }

        if (rejectedNames.length > 0) {
            const openModalFunction = handleOpen('retirar-colaborador');
            openModalFunction();
        }
        //PatchAttClassification(); // Chama a função para enviar as atualizações de classificações

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
        {
            field: 'classification',
            headerName: 'Classificação',
            width: 180,
            editable: showDeleteIcon, // Torna editável apenas se o botão de editar foi pressionado
            type: 'singleSelect',
            valueOptions: classifications
        },
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
            <Modal
                isOpen={modalOpen2}
                onClose={handleFecha}
                onConfirm={handleSendEmail}
                text="Notificar colaborador(a)?"
                actions={true}
                buttons={true}
                complement={"Este colaborador(a) será notificado(a) sobre seus cursos pendentes via email."}
            />
            {openModal === 'notificar' && (
                <ModalNotificarTreinamento open={true} handleClose={handleClose} curso_id={curso_id} />
            )}
            {openModal === 'adicionar-colaborador' && (
                // <ModalAddColaborador id_curso={curso_id} open={true} handleClose={handleClose}  refreshColaboradores={refreshColaboradores} />
                <ModalSelecionarAdd open={true} handleClose={handleClose} curso_id={curso_id} refreshColaboradores={refreshColaboradores} />
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
                                <Botao color='roxo' onClick={handleOpen('adicionar-colaborador')}>
                                    <FontAwesomeIcon className="icon" icon={faPlus} color={branco} /> <span>&nbsp;&nbsp;&nbsp;Adicionar</span>
                                </Botao>

                                <>
                                    {isEditing ? (
                                        <Botao color="roxo" onClick={toggleDeleteIcon}>
                                            <FontAwesomeIcon className="icon" icon={faPencil} color="var(--branco)" />
                                            <span>&nbsp;&nbsp;&nbsp;Editando</span>
                                        </Botao>
                                    ) : (
                                        <Botao color="branco" onClick={toggleDeleteIcon}>
                                            <FontAwesomeIcon className="icon" icon={faPencil} color="var(--roxo)" />
                                            <span>&nbsp;&nbsp;&nbsp;Editar</span>
                                        </Botao>
                                    )}
                                </>

                                <Botao color='branco' onClick={handleExtrair}>
                                    <FontAwesomeIcon className="icon" icon={faPrint} color={roxo} /> <span>&nbsp;&nbsp;&nbsp;Extrair</span>
                                </Botao>
                                <Botao color='branco' onClick={openModal2}>
                                    <FontAwesomeIcon className="icon" icon={faPaperPlane} color={roxo} /> <span>&nbsp;&nbsp;&nbsp;Notificar</span>
                                </Botao>
                            </div>
                        )}

                        {Object.keys(colaboradores).length === 0 ? (
                            <>
                                <div className='sem-treinamentos-train-div'>
                                    <div className='destaque' style={{ backgroundColor: 'var(--branco)', color: 'var(--roxo)' }}>Oops!</div>
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
                            {((role === '[admin]' || role === '[manager]') && Object.keys(colaboradores).length > 0) && <PdfSender id={curso_id} refreshColaboradores={refreshColaboradores} />}
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