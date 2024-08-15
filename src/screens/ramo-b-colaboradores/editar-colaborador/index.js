import { SimpleGrid } from '@chakra-ui/react'; // Importe o SimpleGrid do Chakra UI
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Botao from '../../../components/botao';
import TituloPagina from '../../../components/titulopagina';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2 className="titulomodal">Colaborador Atualizado</h2>
        <p className="descricaomodal">Confirme para salvar as alterações.</p>
        <div className="botoesmodal">
          <button onClick={onConfirm}>OK</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </>
  );
};

const EditarColaborador = () => {
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
    Promise.all([
      fetch('http://localhost:8080/departamentos').then(response => response.json()),
      fetch('http://localhost:8080/posicoes').then(response => response.json()),
    ])
      .then(([departmentsData, positionsData]) => {
        setDepartments(departmentsData);
        setPositions(positionsData);

        return fetch(`http://localhost:8080/colaboradores/${id}`)
          .then(response => response.json())
          .then(collaboratorData => {
            const matchedDepartment = departmentsData.find(d => d.department === collaboratorData.department)?.id || '';
            const matchedPosition = positionsData.find(p => p.position === collaboratorData.position)?.id || '';

            console.log(collaboratorData)
            setCollaborator(collaboratorData);
            setForm({
              name: collaboratorData.name,
              departmentId: matchedDepartment,
              positionId: matchedPosition,
            });
          });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true); // Abre o modal, mas não salva ainda
  };

  const handleConfirm = () => {
    const TratamentoEnvio = {
      name: form.name,
      departmentId: Number(form.departmentId),
      positionId: Number(form.positionId),
    };

    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TratamentoEnvio),
    })
      .then(() => {
        setMessage('Colaborador atualizado com sucesso!');

        const user = 'fernanda';
        const auditId = uuidv4();
        const datetime = new Date().toISOString();

        const auditEntries = [
          { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Nome', field_value: form.name, removed: 'N', reason: 'Edição' },
          { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Departamento', field_value: form.departmentId, removed: 'N', reason: 'Edição' },
          { uuid: auditId, user, datetime, course_modified: '', employee_modified: collaborator.register, field: 'Cargo', field_value: form.positionId, removed: 'N', reason: 'Edição' },
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

        setModalOpen(false); // Fechar o modal
        setTimeout(() => navigate(-1), 1500);
      })
      .catch(error => console.error('Error updating collaborator:', error));
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={handleClose} onConfirm={handleConfirm} />
      <TituloPagina titulopagina="Editar colaborador" />
      {message && <p>{message}</p>}
      {collaborator ? (
        <form className="conteiner-cadastro" onSubmit={handleSubmit}>
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
            <Botao type='reset' color='branco'>Cancelar</Botao>
          </div>
        </form>
      ) : (
        <p>Carregando dados do colaborador...</p>
      )}
    </div>
  );
};

export default EditarColaborador;
