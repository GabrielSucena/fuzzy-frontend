import TituloPagina from '../../../components/titulopagina';
import ToggleContent from '../../../components/toggleContent';
import './duvidas.css'

function Duvidas(){

    return(
        <>
        <TituloPagina
          titulopagina='Dúvidas frequentes'
          descricaotitulo='Veja as principais dúvidas que surgem sobre a usabilidade do site'
          divisor2={true}
        />
        <div className='tutorial-conteiner'>
          <div className='tutorial-conteudo'>
                <ToggleContent title="A adição / remoção / edição de treinamentos / colaboradores não funciona, como resolver?">
                    <ToggleContent title="Para colaboradores">
                    <ul>
                        <li>Em qualquer ação, caso o usuário não tenha o cargo ou escopo, ele não poderá realizar inclusões, alterações ou remoções plenamente</li>
                        <li>Em adições, o ID Sanofi deve ser exatamente 5 números e não existir o mesmo ID já cadastrado</li>
                        <li>Em adições, um email não pode existir em um colaborador já cadastrado</li>
                        <li>Em edições, só será possível alterar os campos se tiver pemissão conforme seu cargo e escopo</li>
                        <li>Em edições, não é possível alterar o ID Fuzzy e ID Sanofi após a inclusão do colaborador</li>
                        <li>Em remoções, não pode ser excluido o colaborador se ele estiver cadastrado em um treinamento ou não for fornecido justificativa no momento</li>
                    </ul>
                    </ToggleContent>
                    <ToggleContent title="Para treinamentos">
                    <ul>
                        <li>Em qualquer ação, caso o usuário não tenha o cargo ou escopo, ele não poderá realizar inclusões, alterações ou remoções plenamente</li>
                        <li>Em adições e edições, não é possível informar uma codificação de um treinamento já cadastrado</li>
                        <li>Em remoções, não pode ser excluido o treinamento se nele houverem colaboradores</li>
                    </ul>
                    </ToggleContent >
                </ToggleContent>
                <ToggleContent title="Na atualização de frequência por PDF não está aparecendo todos os colaboradores da lista, e agora?">
                <ul>
                    <li>Cheque se o PDF está correto</li>
                    <li>Se estiver correto, cheque se ao abrir o mesmo está no padrão</li>
                    <li>Cheque se o colaborador está dentro do treinamento posicionado, só irá aparecer o colaborador caso ele esteja anteriormente cadastrado no treinamento</li>
                </ul>
                </ToggleContent>
          </div>
        </div>
      </>
    )
}

export default Duvidas;