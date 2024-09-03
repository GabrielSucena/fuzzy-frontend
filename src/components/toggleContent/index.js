// src/components/toggleContent/index.js
import React, { useState } from 'react';
import './togglecontent.css'; // Arquivo de estilos para ToggleContent

const ToggleContent = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="toggle-content">
      <div className="toggle-header" onClick={toggleOpen}>
        <h3>{title}</h3>
        <span className="toggle-icon">{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && <div className="toggle-body">{children}</div>}
    </div>
  );
};

export default ToggleContent;
