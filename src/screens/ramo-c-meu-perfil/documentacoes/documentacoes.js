import React from 'react';

function Documentacoes() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/docs/index.html"   // Caminho relativo à raiz do servidor
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Documentação"
      />
    </div>
  );
}

export default Documentacoes;
