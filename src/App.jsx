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

const generateFood = (currentSnake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * TAM_GRID),
      y: Math.floor(Math.random() * TAM_GRID)
    };
    const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!onSnake) break;
  }
  return newFood;
};

function App() {
  // Estado Global del Juego 
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState('Ninguno'); // 'Fácil' o 'Avanzado'
  const [snake, setSnake] = useState(POSICION_INICIAL_SERPIENTE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECCIONES.ARRIBA);
  const [speed, setSpeed] = useState(VELOCIDAD_INICIAL);

  const lastDirection = useRef(DIRECCIONES.ARRIBA);
  const directionQueue = useRef([]);

  const startGame = (modo) => {
    setDifficulty(modo);
    setIsStarted(true);
    setIsGameOver(false);
    setScore(0);
    setLevel(1);
    setSnake(POSICION_INICIAL_SERPIENTE);
    setDirection(DIRECCIONES.ARRIBA);
    lastDirection.current = DIRECCIONES.ARRIBA;
    directionQueue.current = [];
    setSpeed(VELOCIDAD_INICIAL);
    setFood(generateFood(POSICION_INICIAL_SERPIENTE));
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

      const queue = directionQueue.current;
      const ld = queue.length > 0 ? queue[queue.length - 1] : lastDirection.current;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (ld.y !== 1) queue.push(DIRECCIONES.ARRIBA);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (ld.y !== -1) queue.push(DIRECCIONES.ABAJO);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (ld.x !== 1) queue.push(DIRECCIONES.IZQUIERDA);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (ld.x !== -1) queue.push(DIRECCIONES.DERECHA);
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
      let nextDir = direction;
      if (directionQueue.current.length > 0) {
        nextDir = directionQueue.current.shift();
        setDirection(nextDir);
      }

      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Mover cabeza sumando las coordenadas de la dirección actual
        head.x += nextDir.x;
        head.y += nextDir.y;

        lastDirection.current = nextDir;

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

        // manejo de la logica de comer y puntaje
        if (head.x === food.x && head.y === food.y) {
          // si come, sumamos puntos y regeneramos comida
          const newScore = score + 1;
          setScore(newScore);
          setFood(generateFood(newSnake));

          // manejo de niveles, cada 5 puntos aumentamos velocidad (solo Avanzado)
          if (newScore % 5 === 0) {
            setLevel(prevLevel => prevLevel + 1);
            if (difficulty === 'Avanzado') {
              setSpeed(prevSpeed => Math.max(25, prevSpeed - 15)); // Límite de velocidad a 25ms
            }
          }
          // no removemos la cola, asi la serpiente crece
        } else {
          // Si no comió, removemos la cola para dar efecto de movimiento continuo
          newSnake.pop();
        }

        return newSnake;
      });
    };

    // Crear el ciclo que ejecuta moveSnake cada 'speed' milisegundos
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isStarted, isGameOver, direction, speed, score, food, difficulty]);

  return (
    <div className="app-container">
      <h1 className="game-title">Juego Snake</h1>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'flex-start' }}>

        {/* Sidebar de Estadísticas */}
        <div style={{ minWidth: '200px' }}>
          <Score score={score} level={level} difficulty={difficulty} snakeLength={snake.length} />
        </div>

        <div className="board-wrapper" style={{ position: 'relative', width: 'fit-content', border: '2px solid var(--neon-pink)', boxShadow: '0 0 15px var(--neon-pink)' }}>
          {/* Pasamos el estado como props al Tablero */}
          <Board gridSize={TAM_GRID} snake={snake} food={food} />

          {/* Pantalla de inicio */}
          {!isStarted && !isGameOver && (
            <div className="start-screen" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2>Elige la Dificultad</h2>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button onClick={() => startGame('Fácil')}>FÁCIL</button>
                <button onClick={() => startGame('Avanzado')}>AVANZADO</button>
              </div>
            </div>
          )}

          {/* Pantalla de Game Over */}
          {isGameOver && (
            <div className="game-over-screen" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <h2 className="game-over-title">GAME OVER</h2>
              <p className="final-score">PUNTUACIÓN: {score}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => startGame(difficulty)}>REINTENTAR</button>
                <button onClick={() => { setIsGameOver(false); setIsStarted(false); }} style={{ fontSize: '12px' }}>MENÚ PRINCIPAL</button>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
