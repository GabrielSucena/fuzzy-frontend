import './funcionsCenter.css'


export function arrumaDatas({ data }) {

          /**
 * @function arrumaDatas
 * @since 2024
 * @version 1
 * @param {Date} data - Data no modelo YYYY-MM-DD
 * @returns {String} - Data no modelo DD/MM/AAAA
 * @description Converte datas para o modelo brasileiro.
 * @author Vinicius Domingues 
 * @see [LinkedIn do autor](https://www.linkedin.com/in/vinicius-domingues-fonseca/)
 * @see [GitHub do autor](https://github.com/vinicius-domingues)
 * @see [Documentação do React](https://legacy.reactjs.org/docs/getting-started.html)
 */

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
