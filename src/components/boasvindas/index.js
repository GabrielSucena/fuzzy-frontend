import './boasvindas.css'

function BoasVindas( {nome}) {
/**
 * @function BoasVindas
 * @since 2024
 * @version 1
 * @param {String} nome - Nome do usuário logado
 * @returns {} O elemento (div) em tela.
 * @description Modelo centralizado que dá as boas vindas ao usuário com a saudação do período do dia vigente.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

    const cNome = nome
    const currentHour = new Date().getHours();  // Obtém a hora atual
    let cPeriodo;                               // Criando variável sem usar
    
    if (currentHour >= 6 && currentHour < 12) {
        cPeriodo = "Bom dia, ";
    } else if (currentHour >= 12 && currentHour < 18) {
        cPeriodo = "Boa tarde, ";
    } else {
        cPeriodo = "Boa noite, ";
    }
    
    return(
        <div className='boasvindas'>
            <p className='p-boas-vindas'>{cPeriodo} <b>{cNome}!</b></p>
            <p className='desc-boas-vindas'>Seja bem-vindo(a) de volta, cheque aqui suas principais tarefas</p>
        </div>
    )
}

export default BoasVindas
