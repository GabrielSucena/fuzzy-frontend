import React, { useEffect, useState } from "react";
import TituloPagina from "../../../components/titulopagina";
import "./adiciona-colaborador.css";
import { useNavigate } from "react-router-dom";
import Botao from "../../../components/botao";
import { InputLabel, TextField, MenuItem, Select, FormControl } from "@mui/material";
import { SimpleGrid } from "@chakra-ui/react";
import { v4 as uuidv4 } from 'uuid';

function CadastroColaborador() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);
    const [collaborator, setCollaborator] = useState({
        name: '',
        register: '',
        email: '',
        positionId: '',
        departmentId: '',
    });

    useEffect(() => {
        fetch('http://localhost:8080/departamentos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Departamentos:", data); // Verifique os dados
                setDepartments(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/posicoes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("Posições:", data); // Verifique os dados
                setPositions(data);
            })
            .catch((err) => console.log(err));
    }, []);

    function createPost(collaborator) {
        console.log("Dados do colaborador enviados:", collaborator);
        
        fetch('http://localhost:8080/colaboradores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collaborator),
        })
        .then((resp) => {
            if (!resp.ok) {
                return resp.json().then((error) => {
                    console.error("Erro ao adicionar colaborador:", error);
                    throw new Error("Erro na resposta da API");
                });
            }
            return resp.json();
        })
        .then(data => {
            console.log("Collaborator added:", data);
    
            const user = 'fernanda';
            const auditId = uuidv4();
            const datetime = new Date().toISOString();
    
            const auditEntries = [
                { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Nome', field_value: collaborator.name, removed: 'N', reason: 'Inclusão' },
                { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'E-mail', field_value: collaborator.email, removed: 'N', reason: 'Inclusão' },
                { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Registro', field_value: collaborator.register, removed: 'N', reason: 'Inclusão' },
                { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Departamento', field_value: collaborator.departmentId, removed: 'N', reason: 'Inclusão' },
                { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Cargo', field_value: collaborator.positionId, removed: 'N', reason: 'Inclusão' },
            ];
    
            auditEntries.forEach(audit => {
                console.log("Enviando registro de auditoria:", audit);
                fetch('http://localhost:5000/audits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(audit)
                })
                .then(auditResp => {
                    if (!auditResp.ok) {
                        throw new Error(`Erro ao adicionar auditoria, status: ${auditResp.status}`);
                    }
                    return auditResp.json();
                })
                .then(auditData => {
                    console.log("Audit record added:", auditData);
                })
                .catch((err) => {
                    console.error("Audit fetch error:", err);
                });
            });
    
            navigate('/colaboradores', { state: { message: 'Colaborador adicionado com sucesso!' } });
        })
        .catch((err) => {
            console.error("Erro na requisição de adição de colaborador:", err);
        });
    }
    
    

    function handleChange(e) {
        setCollaborator({ ...collaborator, [e.target.name]: e.target.value });
    }

    function handleSelectDepartment(e) {
        setCollaborator({
            ...collaborator,
            departmentId: parseInt(e.target.value, 10), // Garanta que o valor é um número
        });
    }

    function handleSelectPosition(e) {
        setCollaborator({
            ...collaborator,
            positionId: parseInt(e.target.value, 10), // Garanta que o valor é um número
        });
    }

    return (
        <>
            <TituloPagina titulopagina="Adicionar colaborador" />
            <form className="conteiner-cadastro" onSubmit={(e) => {
                e.preventDefault();
                createPost(collaborator);
            }}>
                <SimpleGrid className="grid-container-colaborador" spacingX="4rem" spacingY="3rem" autoComplete="on">
                    <TextField 
                        required
                        className="campo" 
                        type='text'
                        name='name'
                        label="Nome completo" 
                        id='name'
                        placeholder='Digite o nome aqui'
                        onChange={handleChange}
                        value={collaborator.name || ''}
                    />
                    
                    <FormControl fullWidth className="campo">
                        <InputLabel id="collaboratorDepartment">Departamento</InputLabel>
                        <Select 
                            required
                            onChange={handleSelectDepartment}
                            value={collaborator.departmentId || ''}
                            labelId="collaboratorDepartment"
                            name="departmentId" 
                            label="Departamento" 
                        >
                            {departments.map((department) => (
                                <MenuItem value={department.id} key={department.id}>
                                    {department.department}
                                </MenuItem>
                            ))}   
                        </Select>
                    </FormControl> 
                    <FormControl fullWidth className="campo">
                        <InputLabel id="collaboratorPosition">Cargo</InputLabel>
                        <Select 
                            required
                            onChange={handleSelectPosition}
                            value={collaborator.positionId || ''}
                            labelId="collaboratorPosition"
                            name="positionId" 
                            label="Cargo" 
                        >
                            {positions.map((position) => (
                                <MenuItem value={position.id} key={position.id}>
                                    {position.position}
                                </MenuItem>
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
                        value={collaborator.email || ''}
                    />
    
                    <TextField 
                        className="campo" 
                        required 
                        id="register" 
                        label="ID de Registro Sanofi" 
                        type='text'
                        name='register'
                        placeholder='Digite o ID da empresa aqui'
                        onChange={handleChange}
                        value={collaborator.register || ''}
                    />
                </SimpleGrid>
                <div className="botoes">
                    <Botao type='submit' color='roxo'>Adicionar</Botao>
                    <Botao type='reset' color='branco'>Cancelar</Botao>
                </div>
            </form>
        </>
    );
}

export default CadastroColaborador;
