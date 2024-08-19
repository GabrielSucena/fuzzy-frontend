import "./perfil.css";
import TituloPagina from "../../../components/titulopagina";
import { SimpleGrid } from "@chakra-ui/react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Botao from "../../../components/botao";
import { Link, useNavigate } from "react-router-dom";

function Perfil() {
    const [fullName, setFullName] = useState('Fernanda Povreslo');
    const [job, setJob] = useState('1');
    const [department, setDepartment] = useState('1');
    const [email, setEmail] = useState('teste@sanofi.com.br');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('123456');

    const navigate = useNavigate();


    const handleChangeFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleChangeDepartment = (event) => {
        setDepartment(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeJob = (event) => {
        setJob(event.target.value);
    };

    const handleChangeEmail = (event) => {
        const value = event.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Email inválido');
        } else {
            setEmailError('');
        }
    };

    const envioGestora = (e) => {
        e.preventDefault();
        if (emailError) {
            console.log("Corrija os erros antes de enviar.");
            return;
        }
        
        const jsonOutput = {
            fullName: fullName,
            email: email,
            managerPosition: job,
            managerDepartment: department,
            password: password
        };

        console.log(jsonOutput);
    };

    return (
        <>
            <TituloPagina titulopagina="Seu perfil" descricaotitulo="Mantenha suas informações sempre atualizadas" tembotao={false} botao="Ver"/>
            <form className="conteiner-cadastro" onSubmit={envioGestora}>
                <p className="titulo-perfil">Informações do cadastro</p>
                <SimpleGrid columns={2} spacingX="3rem" spacingY="4rem" autoComplete="on">
                    <TextField 
                        className="campo" 
                        required 
                        id="fullName" 
                        label="Nome completo" 
                        value={fullName} 
                        onChange={handleChangeFullName} 
                    />
                    <FormControl fullWidth className="campo">
                        <InputLabel id="managerDepartment">Departamento</InputLabel>
                        <Select 
                            required 
                            labelId="managerDepartment" 
                            id="managerDepartment" 
                            value={department} 
                            label="Departamento" 
                            onChange={handleChangeDepartment}
                        >
                            <MenuItem value={1}>Administração</MenuItem>
                            <MenuItem value={2}>Departamento 2</MenuItem>
                            <MenuItem value={3}>Departamento 3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className="campo">
                        <InputLabel id="managerPosition">Cargo</InputLabel>
                        <Select 
                            disabled 
                            labelId="managerPosition" 
                            id="managerPosition" 
                            value={job}
                            label="Cargo" 
                            onChange={handleChangeJob}
                        >
                            <MenuItem value={1}>Gerente</MenuItem>
                            <MenuItem value={2}>Cargo 2</MenuItem>
                            <MenuItem value={3}>Cargo 3</MenuItem>
                        </Select>
                    </FormControl>
                </SimpleGrid>
                <hr className="divisoria-perfil"/>
                <p className="titulo-perfil">Acesso à conta</p>
                <SimpleGrid columns={2} spacingX="3rem" spacingY="4rem" autoComplete="on">
                    <TextField  
                        disabled
                        className="campo"          
                        id="email" 
                        label="Email" 
                        value={email}
                        onChange={handleChangeEmail} 
                        error={!!emailError} 
                        helperText={emailError}
                    />
                    <TextField
                        id="password"
                        label="Senha"
                        type="password"
                        value={password}
                        onChange={handleChangePassword} 
                    />
                </SimpleGrid>
                <div className="botoes">
                    <Link to={navigate('/')} className="sem-estilo"><Botao type='submit' color='roxo'>Confirmar</Botao></Link>
                    <Link to={navigate('/')} className="sem-estilo"><Botao type='reset' color='branco'>Cancelar</Botao></Link>
                </div>
            </form>
        </>
    );
}

export default Perfil;
