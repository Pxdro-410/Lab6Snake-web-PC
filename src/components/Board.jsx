import React from 'react';
import Snake from './Snake';
import Food from './Food';

function Tablero({ gridSize, snake, food, speed }) {
  return (
    <div className="board-container" style={{ position: 'relative', width: '700px', height: '500px', overflow: 'hidden' }}>
      <Snake snake={snake} gridSize={gridSize} speed={speed} />
      <Food food={food} gridSize={gridSize} />
    </div>
  );
}

export default Tablero;
