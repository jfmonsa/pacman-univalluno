import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { bfs } from "../algos/bfs";

export function usePiggy(
  initialPosition: { x: number; y: number },
  board: string[][],
  kermitPosition: { x: number; y: number }
) {
  const { position, move } = useAgent(initialPosition, board);
  const [useAStar, setUseAStar] = useState(false);

  useEffect(() => {
    // Cada turno, Piggy tiene un 40% de probabilidad de cambiar a A*
    const chance = Math.random();
    if (chance < 0.4) {
      //setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [position]);

  const moveToKermit = () => {
    // Si Piggy está usando A*, moverla hacia Kermit (Puedes implementar A* aquí)
    if (useAStar) {
      console.log("Piggy está usando A*");
    } else {
      // Implementa la búsqueda en amplitud (BFS) para encontrar a Kermit
      const path = bfs(board, position, kermitPosition);

      // Si se encuentra un camino, mueve a Piggy al siguiente paso
      if (path && path.length > 1) {
        move(path[1]); // Mueve a Piggy al siguiente paso del camino
      } else {
        console.warn("No se encontró un camino hacia Kermit.");
      }
    }
  };

  return { position, moveToKermit, useAStar };
}
