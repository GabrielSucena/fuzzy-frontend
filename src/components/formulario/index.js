import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imgLogin from '../../login.svg';
import Botao from '../botao';
import CampoSenha from '../camposenha';
import CampoTexto from '../campotexto';
import './formulario.css';
import { useRole } from '../../functionsCenter/RoleContext';

const Formulario = (props) => {
    const [register, setRegister] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const { setRole } = useRole();


    // Função para criar login e enviar auditoria
    function createLogin(login) {
        console.log("Dados enviados ao login:", login);
        localStorage.removeItem('authToken');
        
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json().then(data => {
                        const token = data.accessToken;
                        const role = data.role;
                        /*const role = '[basic]';*/

                        setRole(role)

                        localStorage.setItem('authToken', token);

                        // Navega para a página inicial com uma mensagem de sucesso
                        navigate('/', { state: { message: 'Login bem-sucedido!' } });

                        
                    });
                } else {
                    return response.json().then(error => {
                        console.error("Erro ao realizar login:", error);
                        // Define mensagem de erro a ser exibida
                        setError("Login falhou. Verifique suas credenciais e tente novamente.");
                    });
                }
            })
            .catch(err => {
                console.error("Erro na requisição de login:", err);
                // Define mensagem de erro a ser exibida
                setError("Usuário ou senha incorretos.");
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Tentativa realizada.');

        // Verifica se ambos os campos estão preenchidos antes de enviar o login
        if (register !== '' && password !== '') {
            console.log('Ambos os campos estão preenchidos. Enviando login...');
            createLogin({ register, password });
        } else {
            setError('Por favor, preencha ambos os campos.'); // Mensagem de erro
            console.log('Por favor, preencha ambos os campos.');
        }
    };

    return (
        <>
            <section className='formulario-container'>
                <form className='formulario-login' onSubmit={handleSubmit}>
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
                        aoAlterado={setPassword}
                        autoComplete="on"
                    />
                    {error && <p className="error-message">{error}</p>} {/* Exibe mensagem de erro */}
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
