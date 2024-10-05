import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { depthLimitedDFS } from "../algos/dfsLimited";

export function useKermit(
  initialPosition: { x: number; y: number },
  board: string[][],
  elmoPosition: { x: number; y: number }
) {
  const { position, move } = useAgent(initialPosition, board);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);
  const DEPTH_LIMIT = 13;

  useEffect(() => {
    // Verifica si Kermit está en la posición de la cookie
    if (board[position.x][position.y] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [position, board]);

  const moveToElmo = () => {
    // Ejecuta DFS limitado por profundidad para encontrar el camino hacia Elmo
    const path = depthLimitedDFS(board, position, elmoPosition, DEPTH_LIMIT);

    // Si encuentra un camino, mueve a Kermit al siguiente paso en el camino
    if (path && path.length > 1) {
      console.log(path);
      move(path[1]); // Mueve a la siguiente posición en el camino
    } else {
      console.log("No se encontró un camino hacia Elmo");
    }
  };

  return { position, moveToElmo, hasCookieBoost };
}
