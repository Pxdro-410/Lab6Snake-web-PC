import React from 'react';

function Comida({ food, gridSize }) {
  if (!food) return null;
  const style = {
    position: 'absolute',
    left: `${(food.x / gridSize) * 100}%`,
    top: `${(food.y / gridSize) * 100}%`,
    width: `${100 / gridSize}%`,
    height: `${100 / gridSize}%`,
    backgroundColor: 'var(--neon-blue)',
    borderRadius: '50%',
    boxShadow: '0 0 15px blue'
  };

  return (
    <div style={style}></div>
  );
}

export default Comida;
