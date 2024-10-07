import { useState, useEffect } from "react";
import styles from "./game.module.css";
import { useKermit } from "./hooks/useKermit";
import { usePiggy } from "./hooks/usePiggy";
import { useBoard } from "./hooks/useBoard";
import { cellType } from "./utils/types";

// TODO: implementar types en ./types para poder reutilizarlos
// TODO: la configuración iniciald del tablero 2 opciones: 1. random, 2. arrastrando

const initialBoard : cellType[][] = [
  ["empty", "empty", "empty", "empty", "kermit"],
  ["empty", "cookie", "wall", "empty", "empty"],
  ["elmo", "wall", "wall", "piggy", "empty"],
  ["empty", "wall", "empty", "empty", "empty"],
];

function Game() {
  const elmoPosition = {row: 2, col: 0};
  const [isSimulating, setIsSimulating] = useState(false);

  // Usa los hooks para gestionar a Kermit y Piggy
  const { position: kermitPosition, moveToElmo } = useKermit(
    { row: 0, col: 4 },
    initialBoard,
    elmoPosition
  );
  const { position: piggyPosition, moveToKermit } = usePiggy(
    { row: 2, col: 3 },
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
    <main>
      <div className={styles.gameBoard}>
        {board.map((row: string[], rowIndex: number) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell: string, colIndex: number) => (
              <div key={colIndex} className={`${styles.cell} ${styles[cell]}`}>
                {cell !== "empty" && cell !== "wall" && (
                  <img src={`src/assets/${cell}.svg`} alt={cell} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleSimulation}>
        {isSimulating ? "Stop Simulation" : "Start Simulation"}
      </button>
    </main>
  );
}

export default Game;
