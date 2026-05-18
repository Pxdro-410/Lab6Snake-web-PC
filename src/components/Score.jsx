import React from 'react';

function Puntuacion({ score, level, difficulty, snakeLength }) {
  return (
    <div style={{ border: '2px solid var(--neon-blue)', padding: '15px', textAlign: 'left', minWidth: '150px' }}>
      <h2 style={{ color: 'white', textShadow: '0 0 10px var(--neon-blue)', marginTop: 0 }}>STATS</h2>
      <p style={{ color: 'white', margin: '10px 0' }}>MODO: <br /><strong style={{ color: 'cyan' }}>{difficulty}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>PUNTOS: <br /><strong style={{ color: 'cyan' }}>{score}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>LONGITUD: <br /><strong style={{ color: 'cyan' }}>{snakeLength}</strong></p>
    </div>
  );
}

export default Puntuacion;
