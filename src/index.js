import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const hasDataInLocalStorage = localStorage.length > 0;

console.log(hasDataInLocalStorage)

if (hasDataInLocalStorage) {
  console.time('App Start Timer');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode> --> Em ambiente dev, ele previne erros e dá mensagens mais amigáveis
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (hasDataInLocalStorage) {
  console.timeEnd('App Start End Timer');
}