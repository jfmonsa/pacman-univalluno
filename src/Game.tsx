import { useState, useEffect } from "react";
import styles from "./game.module.css";
import { useKermit } from "./hooks/useKermit";
import { usePiggy } from "./hooks/usePiggy";
import { useBoard } from "./hooks/useBoard";
import { cellType } from "./utils/types";
import { BeautifulTree, NodeContentGetter } from "@beautiful-tree/react";
import { findPosition } from "./utils/findAgentPosition";
import { generateRandomBoard } from "./utils/generateRandomBoard";

// TODO: la configuración iniciald del tablero 2 opciones: 1. random, 2. arrastrando

const rows = 7;
const cols = 5;
const wallPercentage = 0.2; // 20% de las casillas serán paredes

const initialBoard: cellType[][] = generateRandomBoard(
  rows,
  cols,
  wallPercentage
);

function Game() {
  const elmoInitialPos = findPosition(initialBoard, "elmo");
  const kermitInitialPos = findPosition(initialBoard, "kermit");
  const piggyInitialPos = findPosition(initialBoard, "piggy");

  const [isSimulating, setIsSimulating] = useState(false);

  const handleGameEnd = (reason: string) => {
    console.log(reason);
    setIsSimulating(false);
  };

  const [avoidingLoopsDFS, setAvoidingLoopsDFS] = useState(true);

  // Usa los hooks para gestionar a Kermit y Piggy
  const { position: kermitPosition, moveToElmo } = useKermit(
    kermitInitialPos,
    initialBoard,
    elmoInitialPos,
    avoidingLoopsDFS,
    rows * cols
  );

  const treeKermitToElmo = JSON.parse(
    localStorage.getItem("treeKermitToElmo") as string
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
    <main className={styles.container}>
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
      <input type="range" min="2" max="10"></input>
      <button className={styles.button} onClick={handleSimulation}>
        {isSimulating ? "Stop Simulation" : "Start Simulation"}
      </button>
      <label>
        Evitar ciclos para dfs?
        <input
          type="checkbox"
          checked={avoidingLoopsDFS}
          onChange={(e) => {
            setAvoidingLoopsDFS(e.target.checked);
          }}
        />
      </label>
      <div>
        <h2>Kermit a Elmo</h2>
        <h3>Arbol</h3>
        {treeKermitToElmo && JSON.stringify(treeKermitToElmo) && (
          <BeautifulTree
            id={"my-tree"}
            tree={treeKermitToElmo}
            svgProps={{
              width: 1000,
              height: 1000,
              sizeUnit: "px",
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getNodeContent={(node: any) => {
              console.log(node.v);
              return node.v || "Node";
            }}
          />
        )}
        <h3>Camino</h3>
        {localStorage.getItem("pathKermitToElmo") && (
          <div>{localStorage.getItem("pathKermitToElmo") as string}</div>
        )}
      </div>
    </main>
  );
}

export default Game;
