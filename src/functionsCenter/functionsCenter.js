import './funcionsCenter.css'


export function arrumaDatas({ data }) {
    // Verifica se a data está no formato correto
    if (!data || typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        console.error('Data inválida. Deve estar no formato YYYY-MM-DD.');
        return '';
    }

    // Divide a data em partes: ano, mês e dia
    const [ano, mes, dia] = data.split('-');

    // Formata a data no formato DD/MM/YYYY
    const dataArrumada = `${dia}/${mes}/${ano}`;

    return dataArrumada;
}



export function ExtraiRelatorio( { div } ) {
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = document.querySelector(`.${div}`).innerHTML;
        window.print();

        document.body.innerHTML = originalContent;
        window.location.reload(); // Recarregar a página e restaurar o conteúdo original
    return 
}
