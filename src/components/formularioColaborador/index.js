import { SimpleGrid } from '@chakra-ui/react';
import './formularioColaborador.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Botao from '../botao';
import { useEffect, useState } from 'react';

function FormularioColaborador({ textoBotao, textoBotao2, handleSubmit, collaboratorData }) {
    const [fullName, setFullName] = useState('');

    const [collaborator, setCollaborator] = useState(collaboratorData || {})

    const [job, setJob] = useState([]); // Inicializa como array vazio
    const [departamentos, setDepartamentos] = useState([]); // Inicializa como array vazio

    const [selectedJob, setSelectedJob] = useState(''); // Estado para o cargo selecionado
    const [selectedDepartment, setSelectedDepartment] = useState(''); // Estado para o departamento selecionado

    const [record, setRecord] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/departamentos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setDepartamentos(data);
            })
            .catch((err) => console.log(err));

        fetch('http://localhost:5000/cargos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setJob(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChangeFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleChangeDepartment = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleChangeRecord = (event) => {
        setRecord(event.target.value);
    };

    const handleChangeJob = (event) => {
        setSelectedJob(event.target.value);
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

    const envioColaborador = (e) => {
        e.preventDefault();
        if (emailError) {
            console.log("Corrija os erros antes de enviar.");
            return;
        }
        
        const jsonOutput = {
            fullName: fullName,
            email: email,
            collaboratorPosition: selectedJob,
            collaboratorDepartment: selectedDepartment,
            collaboratorRecord: record
        };

        console.log(jsonOutput);


    };

    return (
        <form className="conteiner-cadastro" onSubmit={envioColaborador}>
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
                    <InputLabel id="collaboratorDepartment">Departamento</InputLabel>
                    <Select 
                        required 
                        labelId="collaboratorDepartment" 
                        value={selectedDepartment} 
                        label="Departamento" 
                        onChange={handleChangeDepartment}>
                        {departamentos.map((value) => (
                            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField 
                    className="campo" 
                    required 
                    id="email" 
                    label="Email" 
                    value={email} 
                    onChange={handleChangeEmail} 
                    error={!!emailError} 
                    helperText={emailError}
                />
                <FormControl fullWidth className="campo">
                    <InputLabel id="collaboratorPosition">Cargo</InputLabel>
                    <Select 
                        required 
                        labelId="collaboratorPosition" 
                        value={selectedJob} 
                        label="Cargo" 
                        onChange={handleChangeJob}
                    >
                        {job.map((value) => (
                            <MenuItem value={value.id} key={value.id}>{value.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField 
                    className="campo" 
                    required 
                    id="collaboratorRecord" 
                    label="Registro" 
                    value={record} 
                    onChange={handleChangeRecord} 
                />
            </SimpleGrid>
            <div className="botoes">
                <Botao type='submit' color='roxo' destino='/ver-colaborador' text={textoBotao} />
                <Botao type='reset' color='branco' destino='/' text={textoBotao2} />
            </div>
        </form>
    );
}

export default FormularioColaborador;
