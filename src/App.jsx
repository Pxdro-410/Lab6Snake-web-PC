import { useState } from 'react';
import './App.css';
import Board from './components/Board';
import Score from './components/Score';

// Constantes iniciales del juego
const TAM_GRID = 20;
const VELOCIDAD_INICIAL = 150;

const DIRECCIONES = {
  ARRIBA: { x: 0, y: -1 },
  ABAJO: { x: 0, y: 1 },
  IZQUIERDA: { x: -1, y: 0 },
  DERECHA: { x: 1, y: 0 }
};

const POSICION_INICIAL_SERPIENTE = [
  { x: 10, y: 12 },
  { x: 10, y: 13 },
  { x: 10, y: 14 }
];

function App() {
  // Estado Global del Juego 
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [snake, setSnake] = useState(POSICION_INICIAL_SERPIENTE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECCIONES.ARRIBA);
  const [speed, setSpeed] = useState(VELOCIDAD_INICIAL);

  return (
    <div className="app-container">
      <h1 className="game-title">Juego Snake</h1>

      {/* Pasamos el estado como props al Score */}
      <Score score={score} level={level} />

      {/* Pasamos el estado como props al Tablero */}
      <Board gridSize={TAM_GRID} snake={snake} food={food} />

    </div>
  );
}

export default App;
