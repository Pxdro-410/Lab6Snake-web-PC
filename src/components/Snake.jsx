import React from 'react';

function Serpiente({ snake, gridSize, speed }) {
  if (!snake) return null;
  const cellSize = 100 / gridSize;
  const transitionDuration = `${speed * 0.6}ms`;

  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        const style = {
          position: 'absolute',
          left: `${segment.x * cellSize}%`,
          top: `${segment.y * cellSize}%`,
          width: `${cellSize}%`,
          height: `${cellSize}%`,
          backgroundColor: isHead ? '#e8e8e4' : 'var(--neon-green)',
          boxShadow: isHead
            ? '0 0 8px #fff, 0 0 16px #00f'
            : '0 0 6px var(--neon-green), 0 0 12px var(--neon-green)',
          transition: `left ${transitionDuration} linear, top ${transitionDuration} linear`,
          zIndex: isHead ? 2 : 1,
        };

        return <div key={index} style={style} />;
      })}
    </>
  );
}

export default Serpiente;
