import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { depthLimitedDFS } from "../algos/dfsLimited";
import { cellType, positionType } from "../utils/types";

export function useKermit(
  initialPosition: positionType,
  board: cellType[][],
  elmoPosition: positionType,
  avoidingLoopsDFS: boolean,
  numberOfCells: number
) {
  const { position, move } = useAgent(initialPosition, board);
  const [path, setPath] = useState<positionType[]>([]); // Almacena el camino calculado
  const [stepIndex, setStepIndex] = useState(0); // Índice para seguir el camino
  const DEPTH_LIMIT = Math.floor(numberOfCells / 2);

  const moveToElmo = () => {
    // Si hay un path calculado, mover a Kermit al siguiente paso en el camino
    if (path.length > 1 && stepIndex < path.length) {
      move(path[stepIndex]); // Mueve a la siguiente posición en el path
      setStepIndex(stepIndex + 1); // Avanza el índice del camino
    }
  };

  useEffect(() => {
    const isAtElmo = () => {
      return (
        position.row === elmoPosition.row && position.col === elmoPosition.col
      );
    };

    // Recalcula el path solo si estamos al inicio (posición inicial o sin path) o si se llega a Elmo
    if (path.length === 0 || stepIndex >= path.length || isAtElmo()) {
      const newPath = depthLimitedDFS(
        board,
        position,
        elmoPosition,
        DEPTH_LIMIT,
        avoidingLoopsDFS
      );
      if (newPath && newPath.length > 1) {
        setPath(newPath); // Establece el nuevo path
        setStepIndex(1); // Inicia desde el primer paso
      } else if (!isAtElmo()) {
        alert("Kermint no encontró un camino a elmo, revisar la profundidad");
      }
    }
  }, [
    position,
    elmoPosition,
    path,
    stepIndex,
    board,
    avoidingLoopsDFS,
    DEPTH_LIMIT,
  ]);

  return { position, moveToElmo };
}
