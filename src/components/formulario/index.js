import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Use `useNavigate` para navegação
import imgLogin from '../../login.svg';
import Botao from '../botao';
import CampoSenha from '../camposenha';
import CampoTexto from '../campotexto';
import './formulario.css';

const Formulario = (props) => {
    const [register, setRegister] = useState('');
    const [password, setSenha] = useState('');
    const navigate = useNavigate(); // Use `useNavigate` para navegação
    const token = localStorage.getItem('authToken');

    // Função para criar login e enviar auditoria
    function createLogin(login) {
        console.log("Dados enviados ao login:", login);

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then(data => {
                        const token = data.accessToken;

                        localStorage.setItem('authToken', token);

                        console.log("Dados do login recebidos:", data);

                        navigate('/', { state: { message: 'Colaborador adicionado com sucesso!' } });
                    });
                } else {
                    return response.json().then(error => {
                        console.error("Erro ao realizar login:", error);
                        throw new Error("Erro na resposta da API");
                    });
                }
            })
            .catch(err => {
                console.error("Erro na requisição de login:", err);
            });
    }

    const validador = (aoClicar) => {
        aoClicar.preventDefault();
        console.log('Tentativa realizada.');
        props.aoColaboradorCadastrado({
            register,
            password
        });

        // Verifica se ambos os campos estão preenchidos antes de enviar o login
        if (register !== '' && password !== '') {
            console.log('Ambos os campos estão preenchidos. Redirecionando...');
            createLogin({ register, password });
        } else {
            console.log('Por favor, preencha ambos os campos.');
        }
    };

    return (
        <>
            <section className='formulario-container'>
                <form className='formulario-login' onSubmit={validador}>
                    <CampoTexto
                        obrigatorio={true}
                        label="ID Sanofi"
                        placeholder="Digite o seu ID de registro aqui"
                        valor={register}
                        aoAlterado={setRegister}
                        autoComplete="on"
                    />

                    <CampoSenha
                        obrigatorio={true}
                        label="Senha"
                        placeholder="Digite sua senha aqui"
                        valor={password}
                        aoAlterado={setSenha}
                        autoComplete="on"
                    />
                    <div className='entrar-esqueci'>
                        <Link to='/digite-o-email'><p>Esqueci a senha</p></Link>

                        <Botao type="submit" color="roxo">
                            Entrar
                        </Botao>

                    </div>
                </form>
                <img src={imgLogin} alt="Imagem login" className='imgLogin' />
            </section>
        </>
    );
};

export default Formulario;
