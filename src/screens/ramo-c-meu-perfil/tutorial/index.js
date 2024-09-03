// src/pages/Tutorial.js
import React from 'react';
import './tutorial.css';
import TituloPagina from "../../../components/titulopagina";
import ToggleContent from '../../../components/toggleContent'; // Importa o ToggleContent

const Tutorial = () => {
  return (
    <>
      <TituloPagina
        titulopagina='Tutorial'
        descricaotitulo='Saiba como fazer cada ação dentro do site'
        divisor2={true}
      />
      <div className='tutorial-conteiner'>
        <div className='tutorial-conteudo'>
          <ToggleContent title="Como cadastrar um colaborador">
            <ol>
              <li>Clique na opção superior 'Colaboradores'</li>
              <li>Clique no botão roxo 'Adicionar'</li>
              <li>Preencha as informações obrigatórias e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como editar um colaborador">
            <ol>
              <li>Clique na opção superior 'Colaboradores'</li>
              <li>Procure o colaborador que deseja alterar e clique sobre ele</li>
              <li>Clique no botão roxo 'Editar'</li>
              <li>Altere as informações e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como remover um colaborador">
            <ol>
              <li>Clique na opção superior 'Colaboradores'</li>
              <li>Procure o colaborador que deseja remover e clique sobre ele</li>
              <li>Clique no botão branco 'Obsoletar'</li>
              <li>Coloque a justificativa da ação e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como cadastrar um treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Clique no botão roxo 'Adicionar'</li>
              <li>Preencha as informações obrigatórias e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como editar um treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja alterar e clique sobre ele</li>
              <li>Clique no botão roxo 'Editar'</li>
              <li>Altere as informações e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como remover um treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja remover e clique sobre ele</li>
              <li>Clique no botão branco 'Obsoletar'</li>
              <li>Coloque a justificativa da ação e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como incluir um colaborador específico no treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja incluir os colaboradores e clique sobre ele</li>
              <li>Clique no botão roxo 'Adicionar'</li>
              <li>Clique no botão roxo 'Por colaborador'</li>
              <li>Selecione os colaboradores e clique na caixa de seleção para selecioná-los</li>
              <li>Confirme</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como incluir um departamento inteiro no treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja incluir os departamentos e clique sobre ele</li>
              <li>Clique no botão roxo 'Adicionar'</li>
              <li>Clique no botão roxo 'Por departamento'</li>
              <li>Selecione os departamentos e clique na caixa de seleção para selecioná-los</li>
              <li>Confirme</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como alterar a criticidade do colaborador no treinamento">
          <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja editar a criticidae dos colaboradores e clique sobre ele</li>
              <li>Clique no botão branco 'Editar'</li>
              <li>Clique duas vezes sobre a criticidade e selecione a nova criticidade e confirme</li>            </ol>
          </ToggleContent>

          <ToggleContent title="Como remover um colaborador do treinamento">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja remover os colaboradores e clique sobre ele</li>
              <li>Clique no botão branco 'Editar'</li>
              <li>Clique na caixa vermelha de exclusão sobre os colaboradores que deseja retirar</li>
              <li>Coloque a justificativa da ação e salve</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como auditar">
            <ol>
              <li>Clique na opção superior 'Auditoria'</li>
              <li>Use os diversos filtros como desejar para auditar o que deseja</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como utilizar o atualizador de frequência">
            <ol>
              <li>Clique na opção superior 'Treinamentos'</li>
              <li>Procure o treinamento que deseja atualizar a frequência e clique sobre ele</li>
              <li>Clique no botão vermelho 'Anexar PDF'</li>
              <li>Arraste o PDF até a tela e confirme</li>
              <li>Veja os colaboradores encontrados referentemente ao curso</li>
              <li>Confirme se concordar, os colaboradores citados terão o curso atualizado!</li>
            </ol>
          </ToggleContent>

          <ToggleContent title="Como notificar colaboradores sobre os treinamentos restantes">
            <ol>
              <li>Clique no botão branco 'Notificar' na tela específica do treinamento ou do colaborador</li>
            </ol>
          </ToggleContent>
        </div>
      </div>
    </>
  );
}

export default Tutorial;
