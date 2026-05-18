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
  const [isStarted, setIsStarted] = useState(true); // Temporalmente true para probar el movimiento
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [snake, setSnake] = useState(POSICION_INICIAL_SERPIENTE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECCIONES.ARRIBA);
  const [speed, setSpeed] = useState(VELOCIDAD_INICIAL);

  const lastDirection = useRef(DIRECCIONES.ARRIBA);

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

      {/* Pasamos el estado como props al Tablero */}
      <Board gridSize={TAM_GRID} snake={snake} food={food} />

    </div>
  );
}

export default App;
