import './boasvindas.css'

function BoasVindas(props){

    const cNome = props.nome
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
