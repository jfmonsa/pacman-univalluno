import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { depthLimitedDFS } from "../algos/dfsLimited";
import { cellType, positionType } from "../utils/types";

export function useKermit(
  initialPosition: positionType,
  board: cellType[][],
  elmoPosition: positionType
) {
  const { position, move } = useAgent(initialPosition, board);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);
  const [path, setPath] = useState<positionType[]>([]); // Almacena el camino calculado
  const [stepIndex, setStepIndex] = useState(0); // Índice para seguir el camino
  // TODO: obtener este valor en un slider, con 12 por defecto
  const DEPTH_LIMIT = 12;

  useEffect(() => {
    // Verifica si Kermit está en la posición de la cookie
    if (board[position.row][position.col] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [position, board]);

  const moveToElmo = () => {
    // Si hay un path calculado, mover a Kermit al siguiente paso en el camino
    if (path.length > 1 && stepIndex < path.length) {
      move(path[stepIndex]); // Mueve a la siguiente posición en el path
      setStepIndex(stepIndex + 1); // Avanza el índice del camino
    }
  };

  useEffect(() => {
    // Recalcula el path solo si estamos al inicio (posición inicial o sin path) o si se llega a Elmo
    const isAtElmo = () => {
      return position.row === elmoPosition.row && position.col === elmoPosition.col;
    };
    if (path.length === 0 || stepIndex >= path.length || isAtElmo()) {
      const newPath = depthLimitedDFS(
        board,
        position,
        elmoPosition,
        DEPTH_LIMIT
      );
      if (newPath && newPath.length > 1) {
        setPath(newPath); // Establece el nuevo path
        setStepIndex(1); // Inicia desde el primer paso
      } else if (isAtElmo()) {
        console.warn(
          "No se encontró un camino hacia Elmo, revise el valor profundidad máxima"
        );
      }
    }
  }, [position, elmoPosition, path, stepIndex, board]);

  return { position, moveToElmo, hasCookieBoost };
}
