import { SimpleGrid } from '@chakra-ui/react';
import './formularioColaborador.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Botao from '../botao';
import { useEffect, useState } from 'react';
import url from '../../functionsCenter/urlController'

function FormularioColaborador({ handleSubmit, collaboratorData, textoBotao, textoBotao2 }) {
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [collaborator, setCollaborator] = useState(collaboratorData || {});
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetch(`${url}/departments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setDepartments(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch(`${url}/positions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 

            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setPositions(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(collaborator);
    };

    function handleChange(e) {
        setCollaborator({ ...collaborator, [e.target.name]: e.target.value });
    }

    function handleSelectDepartment(e) {
        const selectedDepartmentId = e.target.value;
        const selectedDepartment = departments.find(department => department.id === selectedDepartmentId);
        setCollaborator({
            ...collaborator,
            collaboratorDepartment: {
                id: selectedDepartmentId,
                name: selectedDepartment ? selectedDepartment.name : '',
            },
        });
    }

    function handleSelectPosition(e) {
        const selectedPositionId = e.target.value;
        const selectedPosition = positions.find(position => position.id === selectedPositionId);
        setCollaborator({
            ...collaborator,
            collaboratorPosition: {
                id: selectedPositionId,
                name: selectedPosition ? selectedPosition.name : '',
            },
        });
    }

    return (
        
        <form className="conteiner-cadastro" onSubmit={submit}>
            <SimpleGrid className="grid-container-colaborador" spacingX="4rem" spacingY="3rem" autoComplete="on">
                <TextField 
                    required
                    className="campo" 
                    type='text'
                    name='fullName'
                    label="Nome completo" 
                    id='fullName'
                    placeholder='Digite o nome aqui'
                    onChange={handleChange}
                    value={collaborator.fullName ? collaborator.fullName : ''}
                />
                
                <FormControl fullWidth className="campo">
                    <InputLabel id="collaboratorDepartment">Departamento</InputLabel>
                    <Select 
                        required
                        onChange={handleSelectDepartment}
                        value={collaborator.collaboratorDepartment ? collaborator.collaboratorDepartment.id : ''}
                        labelId="collaboratorDepartment"
                        name="collaboratorDepartment" 
                        label="Departamento" 
                    >
                        {departments.map((department) => (
                            <MenuItem value={department.id} key={department.id}>{department.name}</MenuItem>
                        ))}   
                    </Select>
                </FormControl> 
                <FormControl fullWidth className="campo">
                    <InputLabel id="collaboratorPosition">Cargo</InputLabel>
                    <Select 
                        required
                        onChange={handleSelectPosition}
                        value={collaborator.collaboratorPosition ? collaborator.collaboratorPosition.id : ''}
                        labelId="collaboratorPosition"
                        name="collaboratorPosition" 
                        label="Cargo" 
                    >
                        {positions.map((position) => (
                            <MenuItem value={position.id} key={position.id}>{position.name}</MenuItem>
                        ))}   
                    </Select>
                </FormControl>
                <TextField 
                    required
                    className="campo" 
                    type='text'
                    name='email'
                    id="email" 
                    label="Email" 
                    placeholder='Digite o email aqui'
                    onChange={handleChange}
                    value={collaborator.email ? collaborator.email : ''}
                />


                <TextField 
                    className="campo" 
                    required 
                    id="collaboratorRecord" 
                    label="ID de Registro Sanofi" 
                    type='text'
                    name='collaboratorRecord'
                    placeholder='Digite o ID da empresa aqui'
                    onChange={handleChange}
                    value={collaborator.collaboratorRecord ? collaborator.collaboratorRecord : ''}
                />
                
            </SimpleGrid>
            <div className="botoes">
                <Botao type='submit' color='roxo'>{textoBotao}</Botao>
                <Botao type='reset' color='branco'>Cancelar</Botao>
            </div>
        </form>
    );
}

export default FormularioColaborador;
