import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Botao from '../../../components/botao';
import TituloPagina from '../../../components/titulopagina';
import Modal from '../../../components/modal'; // Certifique-se de que o caminho esteja correto

const EditarColaborador = () => {
  const token = localStorage.getItem('authToken');
  const { id } = useParams();
  const navigate = useNavigate();
  const [collaborator, setCollaborator] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [form, setForm] = useState({
    name: '',
    departmentId: '',
    positionId: '',
  });
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsResponse, positionsResponse] = await Promise.all([
          fetch('http://localhost:8080/departamentos', {
            headers: {
              'Authorization': `Bearer ${token}`, // Inclui o token
            }
          }),
          fetch('http://localhost:8080/posicoes', {
            headers: {
              'Authorization': `Bearer ${token}`, // Inclui o token
            }
          })
        ]);

        const departmentsData = await departmentsResponse.json();
        const positionsData = await positionsResponse.json();

        const collaboratorResponse = await fetch(`http://localhost:8080/colaboradores/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclui o token
          }
        });
        const collaboratorData = await collaboratorResponse.json();

        const matchedDepartment = departmentsData.find(d => d.department === collaboratorData.department)?.id || '';
        const matchedPosition = positionsData.find(p => p.position === collaboratorData.position)?.id || '';

        setDepartments(departmentsData);
        setPositions(positionsData);
        setCollaborator(collaboratorData);
        setForm({
          name: collaboratorData.name,
          departmentId: matchedDepartment,
          positionId: matchedPosition,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, token]); // Adicione token às dependências do useEffect

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true); // Abre o modal ao clicar no botão "Salvar"
  };

  const handleConfirm = (justificativa) => {
    const TratamentoEnvio = {
      name: form.name,
      departmentId: Number(form.departmentId),
      positionId: Number(form.positionId),
    };
    
    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, // Inclui o token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TratamentoEnvio),
    })
      .then(() => {
        setMessage('Colaborador atualizado com sucesso!');
        setModalOpen(false);
        setTimeout(() => navigate(-1), 1500);
      })
      .catch(error => {
        console.error('Error updating collaborator:', error);
        setMessage('Erro ao atualizar colaborador.');
      });
  };

  const handleClose = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // Aqui apenas resetamos o formulário sem abrir o modal
    setForm({
      name: '',
      departmentId: '',
      positionId: '',
    });
  };

  return (
    <div>
      <Modal 
        isOpen={modalOpen} 
        onClose={handleClose} 
        onConfirm={handleConfirm} 
        reason={true} 
        complement={"Esse(a) colaborador(a) será alterado(a) com os novos dados."} 
        actions={true} 
        buttons={true} 
        text="Editar colaborador(a)?" 
      />
      <TituloPagina titulopagina="Editar colaborador" />
      {message && <p>{message}</p>}
      {collaborator ? (
        <form className="conteiner-cadastro" onSubmit={handleSubmit} onReset={handleCancel}>
          <SimpleGrid className="grid-container-colaborador" spacingX="4rem" spacingY="3rem" autoComplete="on">
            <TextField
              disabled
              className="campo"
              label="ID de Registro Sanofi"
              value={collaborator.register}
            />
            <TextField
              disabled
              className="campo"
              label="ID Fuzzy"
              value={collaborator.id}
            />

            <TextField
              required
              className="campo"
              type='text'
              name='name'
              label="Nome completo"
              id='name'
              placeholder='Digite o nome aqui'
              onChange={handleChange}
              value={form.name}
            />
            <FormControl fullWidth className="campo">
              <InputLabel id="departmentId">Departamento</InputLabel>
              <Select
                required
                onChange={handleChange}
                value={form.departmentId}
                labelId="departmentId"
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
              <InputLabel id="positionId">Cargo</InputLabel>
              <Select
                required
                onChange={handleChange}
                value={form.positionId}
                labelId="positionId"
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
              disabled
              className="campo"
              label="Email"
              value={collaborator.email}
            />
          </SimpleGrid>
          <div className="botoes">
            <Botao type='submit' color='roxo'>Salvar</Botao>
          </div>
        </form>
      ) : (
        <p>Carregando dados do colaborador...</p>
      )}
    </div>
  );
};

export default EditarColaborador;
