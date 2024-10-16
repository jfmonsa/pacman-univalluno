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
import Footer from "./components/Footer";

const WALLPERCENTAGE = 0.2; // 20% de las casillas serán paredes

function Game() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(5);
  const [board, setBoard] = useState<cellType[][]>(() =>
    generateRandomBoard(rows, cols, WALLPERCENTAGE)
  );
  const [wasReset, setWasReset] = useState(false);

  const [isSimulating, setIsSimulating] = useState(false);
  const [avoidingLoopsDFS, setAvoidingLoopsDFS] = useState(true);

  const handleGameEnd = (reason: string) => {
    setTimeout(() => {
      alert(reason);
    }, 500);
    setIsSimulating(false);
  };

  // Hooks Y estados para los personajes
  const [kermitPosition, setKermitPosition] = useState(() =>
    findPosition(board, "kermit")
  );
  const [piggyPosition, setPiggyPosition] = useState(() =>
    findPosition(board, "piggy")
  );
  const [elmoPosition, setElmoPosition] = useState(() =>
    findPosition(board, "elmo")
  );

  const { moveToElmo, kermitPath, kermitTree, kermitNnodes, kermitAlgoTime } =
    useKermit(
      kermitPosition,
      setKermitPosition,
      board,
      elmoPosition,
      avoidingLoopsDFS,
      rows * cols,
      wasReset
    );

  const {
    moveToKermit,
    piggyTree,
    piggyNnodes,
    piggyPath,
    useAStar,
    piggyAlgoTime,
  } = usePiggy(piggyPosition, setPiggyPosition, board, kermitPosition);

  const { updateBoard } = useBoard(
    board,
    setBoard,
    kermitPosition,
    piggyPosition,
    elmoPosition,
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

  // handleResetBoard + useEffect
  const handleResetBoard = () => {
    setWasReset(!wasReset);
  };

  useEffect(() => {
    if (isSimulating) setIsSimulating(!isSimulating);
    const newBoard = generateRandomBoard(rows, cols, WALLPERCENTAGE);
    setBoard(newBoard);
    setKermitPosition(findPosition(newBoard, "kermit"));
    setElmoPosition(findPosition(newBoard, "elmo"));
    setPiggyPosition(findPosition(newBoard, "piggy"));
    // NOTA: no agrego isSimulating al array de dependencias porque no quiero que se ejecute el useEffect cuando este simulando
    // seguramente hay mejores formas de hacer esto, pero idk
    // eslint-disable-next-line
  }, [rows, cols, wasReset, avoidingLoopsDFS]);

  return (
    <>
      <main className="container">
        <h1>Pacman Univalluno</h1>
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
        <Board board={board} />
        <AlgoVisualization
          {...{
            kermitTree,
            kermitNnodes,
            kermitPath,
            kermitAlgoTime,
            kermitPosition,
            kermitStrategy: `DFS ${
              avoidingLoopsDFS ? "Evitando ciclos" : "Sin evitar ciclos"
            }`,
            piggyTree,
            piggyNnodes,
            piggyPath,
            piggyStrategy: useAStar ? "A*" : "BFS",
            piggyAlgoTime,
            piggyPosition,
          }}
        />
      </main>
      <Footer />
    </>
  );
}

export default Game;
