import { SimpleGrid } from '@chakra-ui/react';
import './formularioColaborador.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Botao from '../botao';
import { useEffect, useState } from 'react';

function FormularioColaborador({ handleSubmit, collaboratorData, textoBotao, textoBotao2 }) {
    const [departments, setDepartments] = useState([]);
    const [collaborator, setCollaborator] = useState(collaboratorData || {});

    useEffect(() => {
        fetch('http://localhost:5000/departments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setDepartments(data);
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
                /*Função handleSelectDepartment:
                    Agora, handleSelectDepartment busca o departamento selecionado da lista departments usando o id selecionado.
                    Em seguida, atualiza o estado collaborator com o id e o name do departamento selecionado.*/
            },
        });
        //console.log(collaborator);
    }

    return (
        <form className="conteiner-cadastro" onSubmit={submit}>
            <SimpleGrid columns={2} spacingX="3rem" spacingY="4rem" autoComplete="on">
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
                {/*}
                <TextField 
                    className="campo" 
                    required 
                    id="email" 
                    label="Email" 
                />
                <FormControl fullWidth className="campo">
                    <InputLabel id="collaboratorPosition">Cargo</InputLabel>
                    <Select 
                        required 
                        labelId="collaboratorPosition" 
                        label="Cargo" 
                    >

                    </Select>
                </FormControl>
                <TextField 
                    className="campo" 
                    required 
                    id="collaboratorRecord" 
                    label="Registro" 
                />*/}
            </SimpleGrid>
            <div className="botoes">
                <Botao type='submit' color='roxo' text={textoBotao} />
                <Botao type='reset' color='branco' text={textoBotao2} />
            </div>
        </form>
    );
}

export default FormularioColaborador;
