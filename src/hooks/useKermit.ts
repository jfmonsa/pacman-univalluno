import { useEffect, useState } from "react";
import { depthLimitedDFS } from "../algos/dfsLimited";
import { cellType, positionType, TreeNode } from "../utils/types";

export function useKermit(
  kermitPosition: positionType,
  setKermitPosition: (position: positionType) => void,
  board: cellType[][],
  elmoPosition: positionType,
  avoidingLoopsDFS: boolean,
  numberOfCells: number,
  wasReset: boolean
) {
  const [path, setPath] = useState<positionType[]>([]); // Almacena el camino calculado
  const [stepIndex, setStepIndex] = useState(0); // Índice para seguir el camino
  const DEPTH_LIMIT = Math.floor(numberOfCells / 2);
  // aux data structures for algo visualization
  const [kermitTree, setKermitTree] = useState<TreeNode | null>(null);

  const moveToElmo = () => {
    // Si hay un path calculado, mover a Kermit al siguiente paso en el camino
    if (path.length > 1 && stepIndex < path.length) {
      setKermitPosition(path[stepIndex]); // Mueve a Kermit a la siguiente posición
      setStepIndex(stepIndex + 1); // Avanza el índice del camino
    }
  };

  useEffect(() => {
    // Recalcula el path solo si estamos al inicio (posición inicial o sin path) o si se llega a Elmo
    if (path.length === 0 || stepIndex >= path.length) {
      const newPath = depthLimitedDFS(
        board,
        kermitPosition,
        elmoPosition,
        DEPTH_LIMIT,
        avoidingLoopsDFS,
        setKermitTree
      );

      if (newPath && newPath.length > 1) {
        setPath(newPath); // Establece el nuevo path
        setStepIndex(1); // Inicia desde el primer paso
      } else {
        //alert("Kermint no encontró un camino a elmo, revisar la profundidad");
      }
    }
  }, [
    kermitPosition,
    elmoPosition,
    path,
    stepIndex,
    board,
    avoidingLoopsDFS,
    DEPTH_LIMIT,
  ]);

  // muy importante para que cada que cambie el board recalcule el path con el nuevo board
  useEffect(() => {
    setPath([]);
    setStepIndex(0);
  }, [numberOfCells, wasReset, avoidingLoopsDFS]);

  return {
    moveToElmo,
    kermitTree,
    kermitPath: path,
  };
}
