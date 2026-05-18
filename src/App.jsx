import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Score from './components/Score';

function App() {
  // aqui se declarara el estado

  return (
    <div className="app-container">
      <h1 className="game-title">Juego Snake</h1>

      {/* Esqueleto del Score */}
      <Score />

      {/* Esqueleto del Tablero*/}
      <Board />

    </div>
  );
}

export default App;
