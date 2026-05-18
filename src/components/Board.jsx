import React from 'react';
import Snake from './Snake';
import Food from './Food';

function Tablero() {
  return (
    <div className="board-container" style={{ width: '600px', height: '400px', border: '2px solid cyan' }}>
      <p style={{ color: 'cyan' }}>componente tablero</p>
      {/* Los componentes Snake y Food se renderizaran aqui*/}
      <Snake />
      <Food />
    </div>
  );
}

export default Tablero;
