import './banner.css'

function Banner() {
/**
 * @function Banner
 * @since 2024
 * @version 3
 * @description Banner responsivo da tela quando o usuário não está autenticado.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 */
    //JSX (parece HTML mas não é, transforma no DOM o HTML)
    return(
        <header className='header-index'>
            <img src="/imagens/logo.svg" alt="Logo"/>
        </header>
        
    )
}

export default Banner