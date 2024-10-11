import { useState, useEffect } from "react";
import styles from "./game.module.css";
import { useKermit } from "./hooks/useKermit";
import { usePiggy } from "./hooks/usePiggy";
import { useBoard } from "./hooks/useBoard";
import { cellType } from "./utils/types";
import { findPosition } from "./utils/findAgentPosition";
import { generateRandomBoard } from "./utils/generateRandomBoard";

// TODO: la configuración iniciald del tablero 2 opciones: 1. random, 2. arrastrando

const rows = 7;
const cols = 5;
const wallPercentage = 0.2; // 20% de las casillas serán paredes

const initialBoard: cellType[][] = generateRandomBoard(rows, cols, wallPercentage);

function Game() {
  const elmoInitialPos = findPosition(initialBoard, "elmo");
  const kermitInitialPos = findPosition(initialBoard, "kermit");
  const piggyInitialPos = findPosition(initialBoard, "piggy");

  const [isSimulating, setIsSimulating] = useState(false);

  const handleGameEnd = (reason: string) => {
    console.log(reason);
    setIsSimulating(false);
  };

  // Usa los hooks para gestionar a Kermit y Piggy
  const { position: kermitPosition, moveToElmo } = useKermit(
    kermitInitialPos,
    initialBoard,
    elmoInitialPos
  );
  const { position: piggyPosition, moveToKermit } = usePiggy(
    piggyInitialPos,
    initialBoard,
    kermitPosition
  );

  const { board, updateBoard } = useBoard(
    initialBoard,
    kermitPosition,
    piggyPosition,
    elmoInitialPos,
    handleGameEnd
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
      <div className = {styles.container}>
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
      <label>Test</label>
      <input type="range" min="2" max="10" ></input>
      <button className={styles.button} onClick={handleSimulation}>
        {isSimulating ? "Stop Simulation" : "Start Simulation"}
      </button>
      </div>
    </main>
  );
}

export default Game;
