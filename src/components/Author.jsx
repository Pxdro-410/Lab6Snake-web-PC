import React from 'react';

function Puntuacion({ autor, carnet, actividad, fecha }) {
  return (
    <div style={{ border: '2px solid var(--neon-yellow)', padding: '15px', textAlign: 'left', minWidth: '150px' }}>
      <h3 style={{ color: 'white', textShadow: '0 0 10px var(--neon-yellow)', marginTop: 0 }}>CREDITOS</h3>
      <p style={{ color: 'white', margin: '10px 0' }}>AUTOR: <br /><strong style={{ color: 'yellow' }}>{autor}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>CARNET: <br /><strong style={{ color: 'yellow' }}>{carnet}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>ACTIVIDAD: <br /><strong style={{ color: 'yellow' }}>{actividad}</strong></p>
      <p style={{ color: 'white', margin: '10px 0' }}>FECHA: <br /><strong style={{ color: 'yellow' }}>{fecha}</strong></p>
    </div>
  );
}

export default Puntuacion;
