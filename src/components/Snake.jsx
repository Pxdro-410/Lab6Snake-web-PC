import React from 'react';

function Serpiente({ snake, gridSize }) {
  if (!snake) return null;
  return (
    <>
      {snake.map((segment, index) => {
        const style = {
          position: 'absolute',
          left: `${(segment.x / gridSize) * 100}%`,
          top: `${(segment.y / gridSize) * 100}%`,
          width: `${100 / gridSize}%`,
          height: `${100 / gridSize}%`,
          backgroundColor: index === 0 ? '#e8e8e4ff' : 'var(--neon-green)',
          boxShadow: index === 0 ? '0 0 15px blue' : '0 0 75px green',
          borderRadius: index === 0 ? '6px' : '3px',
          transition: 'left 1.2s linear, top 1.2s linear'
        };

        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            style={style}
          />
        );
      })}
    </>
  );
}

export default Serpiente;
