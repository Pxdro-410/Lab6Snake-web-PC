import React from 'react';

function Puntuacion({ score, level, difficulty, snakeLength }) {
  return (
    <div style={{ border: '2px solid lightgreen', padding: '15px', textAlign: 'left', minWidth: '150px' }}>
      <h2 style={{ color: 'lightgreen', textShadow: '0 0 8px lightgreen', marginTop: 0 }}>STATS</h2>
      <p style={{ color: 'white', margin: '10px 0' }}>MODO: <br /><strong style={{ color: 'pink' }}>{difficulty}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>PUNTOS: <br /><strong style={{ color: 'yellow' }}>{score}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>NIVEL: <br /><strong style={{ color: 'cyan' }}>{level}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>LONGITUD: <br /><strong style={{ color: 'lime' }}>{snakeLength}</strong></p>
    </div>
  );
}

export default Puntuacion;
