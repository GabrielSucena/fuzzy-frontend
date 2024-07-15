import CampoSenha from '../camposenha';
import CampoTexto from '../campotexto';
import './formulario.css';
import Botao from '../botao';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import imgLogin from '../../login.svg';

const Formulario = (props) => {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const validador = (aoClicar) => {
        aoClicar.preventDefault();
        console.log('Tentativa realizada.');
        props.aoColaboradorCadastrado({
            nome,
            senha
        });

        // Verifica se ambos os campos estão preenchidos antes de trocar de página
        if (nome !== '' && senha !== '') {
            console.log('Ambos os campos estão preenchidos. Redirecionando...');
        } else {
            // Exibe uma mensagem de erro ou realiza outra ação desejada
            console.log('Por favor, preencha ambos os campos.');
            aoClicar.preventDefault(); // Impede a troca de página
        }
    };

    return (
        <>
            <section className='formulario-container'>
                <form className='formulario-login' onSubmit={validador}>
                    <CampoTexto
                        obrigatorio={true}
                        label="E-mail"
                        placeholder="Digite seu e-mail aqui"
                        valor={nome}
                        aoAlterado={valor => setNome(valor)}
                    />
                    
                    <CampoSenha
                        obrigatorio={true}
                        label="Senha"
                        placeholder="Digite sua senha aqui"
                        valor={senha}
                        aoAlterado={valor => setSenha(valor)}
                    />
                    <div className='entrar-esqueci'>
                        <Link to='/digite-o-email'><p>Esqueci a senha</p></Link>
                        <Link to='/home'>
                            <Botao type="submit" color="roxo">
                                Entrar
                            </Botao>
                        </Link>
                    </div>
                </form>
                <img src={imgLogin} alt="Imagem login" className='imgLogin' />
            </section>
        </>
    );
};

export default Formulario;
