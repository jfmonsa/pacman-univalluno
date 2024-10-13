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

// Parámetros iniciales
const initialRows = 7;
const initialCols = 5;
const wallPercentage = 0.2; // 20% de las casillas serán paredes

function Game() {
  // Estados para el tamaño del tablero
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [board, setBoard] = useState<cellType[][]>(() =>
    generateRandomBoard(rows, cols, wallPercentage)
  );

  // Estado de simulación y control de loops
  const [isSimulating, setIsSimulating] = useState(false);
  const [avoidingLoopsDFS, setAvoidingLoopsDFS] = useState(true);

  const handleGameEnd = (reason: string) => {
    alert(reason);
    setIsSimulating(false);
  };

  // Regenerar el si isSimulating es false
  useEffect(() => {
    if (isSimulating) return;
    setBoard(generateRandomBoard(rows, cols, wallPercentage));
  }, [rows, cols, isSimulating]);

  // Hooks para los personajes
  const elmoInitialPos = findPosition(board, "elmo");
  const kermitInitialPos = findPosition(board, "kermit");
  const piggyInitialPos = findPosition(board, "piggy");

  const { position: kermitPosition, moveToElmo } = useKermit(
    kermitInitialPos,
    board,
    elmoInitialPos,
    avoidingLoopsDFS,
    rows * cols
  );

  const { position: piggyPosition, moveToKermit } = usePiggy(
    piggyInitialPos,
    board,
    kermitPosition
  );

  const { updateBoard } = useBoard(
    board,
    setBoard,
    kermitPosition,
    piggyPosition,
    elmoInitialPos,
    handleGameEnd
  );

  // Simular movimientos
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      moveToElmo();
      moveToKermit();
      updateBoard();
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating, moveToElmo, moveToKermit, updateBoard]);

  // Manejar la simulación
  const handleSimulation = () => setIsSimulating(!isSimulating);

  // Manejar la regeneración del tablero
  const handleResetBoard = () => {
    setBoard(generateRandomBoard(rows, cols, wallPercentage));
  };

  return (
    <main className="container">
      <h1>Pacman Univalluno</h1>
      <Board board={board} />
      <Controls
        {...{
          isSimulating,
          handleSimulation,
          avoidingLoopsDFS,
          setAvoidingLoopsDFS,
          rows,
          setRows,
          cols,
          setCols,
          handleResetBoard,
        }}
      />
      <AlgoVisualization />
    </main>
  );
}

export default Game;
