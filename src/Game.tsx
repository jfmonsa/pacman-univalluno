import { useState, useEffect } from "react";
import { useKermit } from "./hooks/useKermit";
import { usePiggy } from "./hooks/usePiggy";
import { useBoard } from "./hooks/useBoard";

// TODO: implementar types en ./types para poder reutilizarlos

const initialBoard = [
  ["empty", "empty", "empty", "empty", "kermit"],
  ["empty", "empty", "cookie", "empty", "empty"],
  ["elmo", "empty", "empty", "piggy", "empty"],
];

function Game() {
  const elmoPosition = { x: 2, y: 0 };
  const [isSimulating, setIsSimulating] = useState(false);

  // Usa los hooks para gestionar a Kermit y Piggy
  const { position: kermitPosition, moveToElmo } = useKermit(
    { x: 0, y: 4 },
    initialBoard,
    elmoPosition
  );
  const { position: piggyPosition, moveToKermit } = usePiggy(
    { x: 2, y: 3 },
    initialBoard,
    kermitPosition
  );

  const { board, updateBoard } = useBoard(
    initialBoard,
    kermitPosition,
    piggyPosition,
    elmoPosition
  );

  // Simula el movimiento de Kermit y Piggy
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      moveToElmo();
      moveToKermit();
      updateBoard();
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating, moveToElmo, moveToKermit, updateBoard]);

  const handleSimulation = () => setIsSimulating(!isSimulating);

  return (
    <div>
      <div className="game-board">
        {board.map((row: string[], rowIndex: number) => (
          <div key={rowIndex} className="row">
            {row.map((cell: string, colIndex: number) => (
              <div key={colIndex} className={`cell ${cell}`}>
                {cell !== "empty" && (
                  <img src={`src/assets/${cell}.svg`} alt={cell} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSimulation}>Start Simulation</button>
    </div>
  );
}

export default Game;
