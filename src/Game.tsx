import { useState, useEffect } from "react";
import { useKermit } from "./hooks/useKermit";
import { usePiggy } from "./hooks/usePiggy";
import { useBoard } from "./hooks/useBoard";
import { cellType } from "./utils/types";
import { findPosition } from "./utils/findAgentPosition";
import { generateRandomBoard } from "./utils/generateRandomBoard";
import "./main.css";
// Components
import Board from "./components/Board/Board";
import Controls from "./components/Controls/Controls";
import AlgoVisualization from "./components/AlgoVisulization/AlgoVisualization";

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
    <main className="container">
      <Board board={board} />
      <Controls
        {...{
          isSimulating,
          handleSimulation,
          avoidingLoopsDFS,
          setAvoidingLoopsDFS,
        }}
      />
      <AlgoVisualization />
    </main>
  );
}

export default Game;
