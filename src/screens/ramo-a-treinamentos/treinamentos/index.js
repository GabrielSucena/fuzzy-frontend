import "./treinamentos.css";
import Bannerhome from "../../../components/bannerhome";
import Rodape from "../../../components/rodape";
import TituloPagina from "../../../components/titulopagina";

function Treinamentos() {
  return (
    <>
      <Bannerhome />
      <TituloPagina
        titulopagina="Treinamentos"
        botao1="Adicionar"
        destino1="/adicionar-treinamentos"
        color1="roxo"
      />

      <Rodape />
    </>
  );
}

export default Treinamentos;
