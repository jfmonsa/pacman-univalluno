import { useState, useEffect } from "react";

const initialBoard = [
  ["empty", "empty", "empty", "empty", "kermit"],
  ["empty", "empty", "cookie", "empty", "empty"],
  ["elmo", "empty", "empty", "piggy", "empty"],
];

function Game() {
  const [board, setBoard] = useState(initialBoard);
  const [kermitPosition, setKermitPosition] = useState({ x: 0, y: 4 });
  const [piggyPosition, setPiggyPosition] = useState({ x: 2, y: 3 });
  const [elmoPosition] = useState({ x: 2, y: 0 });
  const [cookiePosition] = useState({ x: 1, y: 2 });

  // Movimiento de René (Búsqueda limitada por profundidad)
  useEffect(() => {
    const moveKermit = () => {
      // Implementa el algoritmo de búsqueda limitada por profundidad
      // Modifica la posición de Kermit y actualiza el tablero
    };

    const interval = setInterval(moveKermit, 1000); // Mueve a René cada segundo
    return () => clearInterval(interval);
  }, [kermitPosition]);

  // Movimiento de Piggy (Búsqueda por amplitud + probabilidad de usar A*)
  useEffect(() => {
    const movePiggy = () => {
      // Implementa el algoritmo de búsqueda por amplitud
      // Con probabilidad de 40% cambia a A* y modifica la posición de Piggy
    };

    const interval = setInterval(movePiggy, 1000); // Mueve a Piggy cada segundo
    return () => clearInterval(interval);
  }, [piggyPosition]);

  // Renderiza el tablero
  return (
    <div className="game-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className={`cell ${cell}`}>
              {cell !== "empty" && (
                <img src={`/images/${cell}.png`} alt={cell} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;
