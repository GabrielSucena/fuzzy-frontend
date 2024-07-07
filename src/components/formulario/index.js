import CampoSenha from '../camposenha'
import CampoTexto from '../campotexto'
import './formulario.css'
import Botao from '../botao';
import { useState } from 'react';
import { Link } from 'react-router-dom'

const Formulario = (props) => {
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const validador = (aoClicar) =>{
        aoClicar.preventDefault();
        console.log('Tentativa realizada.');
        props.aoColaboradorCadastrado({
            nome,
            senha
        })

        // Verifica se ambos os campos estão preenchidos antes de trocar de página
        if (nome !== '' && senha !== '') {
            console.log('Ambos os campos estão preenchidos. Redirecionando...');
        } else {
            // Exibe uma mensagem de erro ou realiza outra ação desejada
            console.log('Por favor, preencha ambos os campos.');
            aoClicar.preventDefault(); // Impede a troca de página
        }
    }

    return(
        <section className='formulario'>
            <form onSubmit={validador}>
                <CampoTexto
                    obrigatorio={true}
                    label="E-mail"
                    placeholder="Digite seu e-mail aqui"
                    valor={nome}
                    aoAlterado={valor=>setNome(valor)}
                />
                
                <CampoSenha
                    obrigatorio={true}
                    label="Senha"
                    placeholder="Digite sua senha aqui"
                    valor={senha}
                    aoAlterado={valor=>setSenha(valor)}
                />
                <div className='entrar-esqueci'>
                    <Link to='/digite-o-email'><p>Esqueci minha senha</p></Link>
                    {/*<Link to={nome !== '' && senha !== '' ? '/home' : '/'}>  Verifica se ambos os campos estão preenchidos */}
                    <Link to='/home'>
                        <Botao type="submit" color="roxo">
                            Entrar
                        </Botao>
                    </Link>
                </div>
            </form>
        </section>
    )
};

export default Formulario;
