import "./perfil.css";
import TituloPagina from "../../../components/titulopagina";
import { SimpleGrid } from "@chakra-ui/react";
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import url from '../../../functionsCenter/urlController'

function Perfil() {
    const token = localStorage.getItem('authToken');
    const [fullName, setFullName] = useState('');
    const [job, setJob] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('admin@gmail.com');
    const [newPassword, setNewPassword] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${url}/usuario`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            setFullName(data.name || '');
            setJob(data.position || '');
            setDepartment(data.department || '');
            setEmail(data.register || 'admin@gmail.com');
        })
        .catch(err => console.log(err));
    }, [token]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmPasswordChange = () => {
        fetch(`${url}/usuario`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ password: newPassword }),
        })
        .then(data => {
            console.log('Senha alterada com sucesso', data);
            setStatusMessage('Senha alterada com sucesso!');
            handleCloseModal();
            // Gerar animação após a confirmação
            const messageElement = document.querySelector('.status-message');
            if (messageElement) {
                messageElement.classList.add('show');
                setTimeout(() => {
                    messageElement.classList.add('move-right');
                    setTimeout(() => {
                        setStatusMessage('');
                        messageElement.classList.remove('show', 'move-right');
                    }, 5000); // Tempo total de exibição (5 segundos)
                }, 5000); // Tempo de centralização (5 segundos)
            }
        })
        .catch(error => {
            console.log('Erro ao alterar senha:', error);
            setStatusMessage('Erro ao alterar senha. Tente novamente.');
            // Gerar animação após a confirmação de erro
            const messageElement = document.querySelector('.status-message');
            if (messageElement) {
                messageElement.classList.add('show');
                setTimeout(() => {
                    messageElement.classList.add('move-right');
                    setTimeout(() => {
                        setStatusMessage('');
                        messageElement.classList.remove('show', 'move-right');
                    }, 5000); // Tempo total de exibição (5 segundos)
                }, 5000); // Tempo de centralização (5 segundos)
            }
        });
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {statusMessage && (
                <div className="status-message">
                    {statusMessage}
                </div>
            )}
            <TituloPagina titulopagina="Seu perfil" descricaotitulo="Mantenha suas informações sempre atualizadas" tembotao={false} botao="Ver"/>
            <form className="conteiner-cadastro">
                <p className="titulo-perfil">Informações do cadastro</p>
                <SimpleGrid columns={2} spacingX="3rem" spacingY="4rem">
                    <TextField 
                        className="campo" 
                        disabled
                        id="fullName" 
                        label="Nome completo" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                    />
                    <FormControl fullWidth className="campo">
                        <TextField 
                            disabled
                            value={department} 
                            label="Departamento" 
                        />
                    </FormControl>
                    <FormControl fullWidth className="campo">
                        <TextField 
                            disabled 
                            value={job}
                            label="Cargo" 
                        />
                    </FormControl>
                </SimpleGrid>
                <hr className="divisoria-perfil"/>
                <p className="titulo-perfil">Acesso à conta</p>
                <SimpleGrid columns={2} spacingX="3rem" spacingY="4rem">
                    <TextField  
                        disabled
                        className="campo"          
                        id="email" 
                        label="ID Sanofi" 
                        value={email}
                    />
                    <Button 
                        className="trocar-senha-auditoria" 
                        onClick={handleOpenModal}
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius:'10rem'
                        }}
                    >
                        Trocar senha
                    </Button>
                </SimpleGrid>
            </form>

            {/* Modal para trocar a senha */}
            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                PaperProps={{
                    style: {
                        width: '30rem',
                        height: '20rem',
                        maxWidth: '90vw',
                        borderRadius: '16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: 'var(--roxo)',
                        color: 'var(--branco)',
                        borderBottom: '1px solid #ddd',
                        paddingLeft: '15%',
                        paddingRight: '15%'
                    }}
                >
                    Altere a sua senha
                </DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: '16.5%',
                        paddingRight: '16.5%',
                    }}
                >
                    <FormControl sx={{ m: 1, width: '92%', marginTop: '2rem' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Senha"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions
                    sx={{
                        paddingTop: '0%',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                        paddingBottom: '10%',
                        justifyContent: 'center',
                        gap: '15%',
                    }}
                >
                    <Button 
                        onClick={handleConfirmPasswordChange}
                        sx={{
                            backgroundColor: 'var(--roxo)',
                            color: 'var(--branco)',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            border: '2px solid var(--roxo)',
                            '&:hover': {
                                backgroundColor: '#8a22c5',
                                color: 'var(--branco)',
                                fontWeight: 'bolder'
                            }
                        }}
                    >
                        Confirmar
                    </Button>
                    <Button
                        onClick={handleCloseModal}
                        sx={{
                            backgroundColor: 'var(--branco)',
                            color: 'var(--roxo)',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            border: '2px solid var(--roxo)',
                            '&:hover': {
                                backgroundColor: '#f2f2f2',
                                fontWeight: 'bolder',
                                color: '#8a22c5',
                                border: '2px solid #8a22c5'
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Perfil;
