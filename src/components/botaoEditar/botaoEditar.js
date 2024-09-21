import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Botao from '../botao';
import '../../../src/index.css'; // Certifique-se de que o CSS com as variáveis de cor esteja importado
function MeuBotao() {
    const [isFilled, setIsFilled] = useState(false);
  
    const toggleDeleteIcon = () => {
      setIsFilled(!isFilled); // Alterna entre preenchido e não preenchido
    };
  
    return (
      <Botao
        className={`botao ${isFilled ? 'preenchido' : ''}`} 
        onClick={toggleDeleteIcon}
      >
        <FontAwesomeIcon className="icon" icon={faPencil} color="var(--roxo)" />
        <span>&nbsp;&nbsp;&nbsp;Editar</span>
      </Botao>
    );
  }
  
  export default MeuBotao;