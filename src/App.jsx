import { useState, useEffect, useRef } from 'react';
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

  const lastDirection = useRef(DIRECCIONES.ARRIBA);

  const startGame = () => {
    setIsStarted(true);
    setIsGameOver(false);
    setScore(0);
    setLevel(1);
    setSnake(POSICION_INICIAL_SERPIENTE);
    setDirection(DIRECCIONES.ARRIBA);
    lastDirection.current = DIRECCIONES.ARRIBA;
    setSpeed(VELOCIDAD_INICIAL);
  };

  const gameOver = () => {
    setIsGameOver(true);
    setIsStarted(false);
  };

  // useEffect para el teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignorar si el juego no está activo
      if (!isStarted || isGameOver) return;

      const ld = lastDirection.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (ld.y !== 1) setDirection(DIRECCIONES.ARRIBA);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (ld.y !== -1) setDirection(DIRECCIONES.ABAJO);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (ld.x !== 1) setDirection(DIRECCIONES.IZQUIERDA);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (ld.x !== -1) setDirection(DIRECCIONES.DERECHA);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isGameOver]);

  // useEffect para el Game Loop 
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Mover cabeza sumando las coordenadas de la dirección actual
        head.x += direction.x;
        head.y += direction.y;

        lastDirection.current = direction;

        // Colisión con paredes
        if (head.x < 0 || head.x >= TAM_GRID || head.y < 0 || head.y >= TAM_GRID) {
          gameOver();
          return prevSnake;
        }

        // Colisión consigo misma
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          gameOver();
          return prevSnake;
        }

        // Añadimos la nueva cabeza
        newSnake.unshift(head);

        // Removemos la cola para dar efecto de movimiento continuo
        newSnake.pop();

        return newSnake;
      });
    };

    // Crear el ciclo que ejecuta moveSnake cada 'speed' milisegundos
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isStarted, isGameOver, direction, speed]);

  return (
    <div className="app-container">
      <h1 className="game-title">Juego Snake</h1>

      {/* Pasamos el estado como props al Score */}
      <Score score={score} level={level} />

      <div className="board-wrapper" style={{ position: 'relative', width: 'fit-content', margin: '0 auto' }}>
        {/* Pasamos el estado como props al Tablero */}
        <Board gridSize={TAM_GRID} snake={snake} food={food} />

        {/* Pantalla de inicio */}
        {!isStarted && !isGameOver && (
          <div className="start-screen">
            <h2>¿Listo para comenzar?</h2>
            <button onClick={startGame}>START GAME</button>
          </div>
        )}

        {/* Pantalla de Game Over */}
        {isGameOver && (
          <div className="game-over-screen">
            <h2 className="game-over-title">GAME OVER</h2>
            <p className="final-score">PUNTUACIÓN: {score}</p>
            <button onClick={startGame}>INTENTAR DE NUEVO</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
