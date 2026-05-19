import { useState, useEffect, useRef } from 'react';
import './App.css';
import Board from './components/Board';
import Score from './components/Score';
import Creador from './components/Author';

const TAM_GRID = 20;
const VELOCIDAD_INICIAL = 120;

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
    const onSnake = currentSnake.some(s => s.x === newFood.x && s.y === newFood.y);
    if (!onSnake) break;
  }
  return newFood;
};

const isOpposite = (a, b) => a.x === -b.x && a.y === -b.y;

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [difficulty, setDifficulty] = useState('Ninguno');
  const [snake, setSnake] = useState(POSICION_INICIAL_SERPIENTE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [speed, setSpeed] = useState(VELOCIDAD_INICIAL);

  const lastDirection = useRef(DIRECCIONES.ARRIBA);
  const dirQueue = useRef([]);       // maximo 2 direcciones en cola
  const foodRef = useRef({ x: 5, y: 5 });
  const scoreRef = useRef(0);
  const difficultyRef = useRef('Ninguno');

  const startGame = (modo) => {
    difficultyRef.current = modo;
    setDifficulty(modo);
    setIsStarted(true);
    setIsGameOver(false);
    scoreRef.current = 0;
    setScore(0);
    setLevel(1);
    setSnake(POSICION_INICIAL_SERPIENTE);
    lastDirection.current = DIRECCIONES.ARRIBA;
    dirQueue.current = [];
    setSpeed(VELOCIDAD_INICIAL);
    const initialFood = generateFood(POSICION_INICIAL_SERPIENTE);
    foodRef.current = initialFood;
    setFood(initialFood);
  };

  const gameOver = () => {
    setIsGameOver(true);
    setIsStarted(false);
  };

  // manejo del teclado hasta 2 direcciones en cola
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isStarted || isGameOver) return;
      const queue = dirQueue.current;
      // Validar contra el último elemento de la cola (o lastDirection si vacía)
      const validateAgainst = queue.length > 0 ? queue[queue.length - 1] : lastDirection.current;

      let newDir = null;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': newDir = DIRECCIONES.ARRIBA; break;
        case 'ArrowDown': case 's': case 'S': newDir = DIRECCIONES.ABAJO; break;
        case 'ArrowLeft': case 'a': case 'A': newDir = DIRECCIONES.IZQUIERDA; break;
        case 'ArrowRight': case 'd': case 'D': newDir = DIRECCIONES.DERECHA; break;
      }

      if (newDir && !isOpposite(newDir, validateAgainst) && queue.length < 2) {
        queue.push(newDir);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isGameOver]);

  // el loop solo se reinicia cuando cambia speed o el estado del juego
  useEffect(() => {
    if (!isStarted || isGameOver) return;

    const moveSnake = () => {
      const queue = dirQueue.current;
      const dir = queue.length > 0 ? queue.shift() : lastDirection.current;
      const currentFood = foodRef.current;
      const currentScore = scoreRef.current;

      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        head.x += dir.x;
        head.y += dir.y;

        lastDirection.current = dir;

        if (head.x < 0 || head.x >= TAM_GRID || head.y < 0 || head.y >= TAM_GRID) {
          gameOver();
          return prevSnake;
        }

        if (newSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          gameOver();
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === currentFood.x && head.y === currentFood.y) {
          const newScore = currentScore + 1;
          scoreRef.current = newScore;
          setScore(newScore);

          const newFood = generateFood(newSnake);
          foodRef.current = newFood;
          setFood(newFood);

          if (newScore % 5 === 0) {
            setLevel(prev => prev + 1);
            if (difficultyRef.current === 'Avanzado') {
              setSpeed(prev => Math.max(75, prev - 15));
            }
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [isStarted, isGameOver, speed]);

  return (
    <div className="app-container">
      <h1 className="game-title">Juego Snake</h1>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'flex-start' }}>

        <div style={{ minWidth: '200px' }}>
          <Score score={score} level={level} difficulty={difficulty} snakeLength={snake.length} />
        </div>

        <div className="board-wrapper" style={{ position: 'relative', width: 'fit-content', border: '2px solid var(--neon-pink)', boxShadow: '0 0 15px var(--neon-pink)' }}>
          <Board gridSize={TAM_GRID} snake={snake} food={food} speed={speed} />

          {!isStarted && !isGameOver && (
            <div className="overlay-screen">
              <h2 className="overlay-title">Elige la Dificultad</h2>
              <div className="difficulty-buttons">
                <button className="diff-btn diff-btn--easy" onClick={() => startGame('Fácil')}>
                  <span className="diff-btn__label">FACIL</span>
                  <span className="diff-btn__sub">velocidad normal</span>
                </button>
                <button className="diff-btn diff-btn--hard" onClick={() => startGame('Avanzado')}>
                  <span className="diff-btn__label">AVANZADO</span>
                  <span className="diff-btn__sub">velocidad aumentada</span>
                </button>
              </div>
            </div>
          )}

          {isGameOver && (
            <div className="overlay-screen">
              <h2 className="game-over-title">GAME OVER</h2>
              <p className="final-score">PUNTUACIÓN: {score}</p>
              <div className="gameover-buttons">
                <button className="action-btn action-btn--retry" onClick={() => startGame(difficulty)}>REINTENTAR</button>
                <button className="action-btn action-btn--menu" onClick={() => { setIsGameOver(false); setIsStarted(false); }}>MENÚ PRINCIPAL</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar del Creador */}
        <div style={{ minWidth: '200px' }}>
          <Creador
            autor="Pedro Caso"
            carnet="241286"
            actividad="Laboratorio 6 WEB"
            fecha="Mayo 2026"
          />
        </div>
      </div>

    </div>
  );
}

export default App;
