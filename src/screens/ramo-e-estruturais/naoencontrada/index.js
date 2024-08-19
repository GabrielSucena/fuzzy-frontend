import './naoencontrada.css'
import paginaNaoEncontrada from '../../../paginaNaoEncontrada.svg';

function NaoEncontrada(){

    return(
        <>
            <div className='nao-encontrada'>
                <img className='imagem-nao-encontrada' src={paginaNaoEncontrada} alt='Ilustração para dizer que a página não foi encontrada.'/>
                <div className='textos'>
                    <p className='texto-nao-encontrada'>Esse <span className="destaque-dois">caminho</span> de página digitado <span className="destaque-tres">não</span> existe!</p>
                    <p className='subtexto-nao-encontrada'>Verifique o seu Link/URL e tente novamente.</p>
                </div>

            </div>
            <div className='space'>.</div>

        </>
    )
}

export default NaoEncontrada;