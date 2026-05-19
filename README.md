# Laboratorio 6: Snake Game
## Pedro Caso - 241286
### Sistemas y tecnologías web

## Descripcion
Este proyecto es una implementacion del clasico juego Snake, desarrollado con React y Vite. El objetivo principal es la construccion de una interfaz de usuario interactiva estructurada en componentes modulares, aplicando el uso de propiedades (props) y el manejo correcto del ciclo de vida y estados mediante hooks (useState, useEffect, useRef).

## Instrucciones para instalar y correr el proyecto
Para levantar el entorno de desarrollo y probar el juego de manera local, asegurate de tener Node.js instalado en tu sistema. Luego, ejecuta los siguientes comandos en la terminal desde la raiz del proyecto:

primero clona el repositorio y entra a la carpeta:
$ git clone https://github.com/Pxdro-410/Lab6Snake-web-PC.git
$ cd snake-game

1. Instala las dependencias necesarias:
npm install

2. Inicia el servidor de desarrollo:
npm run dev

Una vez iniciado el servidor, puedes visualizar el juego abriendo en tu navegador el enlace local que proporcionara la terminal (usualmente http://localhost:5173).

## Instrucciones para jugar
El objetivo del juego es controlar a la serpiente para recolectar la mayor cantidad de comida posible. El juego termina si la serpiente choca contra los bordes del tablero o contra su propio cuerpo.

Controles:
- Utiliza las flechas direccionales de tu teclado o las teclas W, A, S y D para cambiar la direccion de la serpiente (Arriba, Abajo, Izquierda, Derecha).

Modos de Juego:
Al iniciar, deberas seleccionar entre dos dificultades:
- Facil: La velocidad de la serpiente se mantendra constante sin importar cuanto crezca tu puntuacion.
- Avanzado: La dificultad es dinamica. Cada vez que recolectes 5 unidades de comida y subas de nivel, la velocidad de movimiento de la serpiente aumentara de manera progresiva.
