import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";
import { bfs } from "../algos/bfs";
import { aStar } from "../algos/aStar";
import { cellType, positionType } from "../utils/types";

export function usePiggy(
  initialPosition: positionType,
  board: cellType[][],
  kermitPosition: positionType
) {
  const { position, move } = useAgent(initialPosition, board);
  const [useAStar, setUseAStar] = useState(false);
  // TODO: abstraer la logica de has cookie boost en useAgent
  const [hasCookieBoost, setHasCookieBoost] = useState(false);

  useEffect(() => {
    // Verifica si Kermit está en la posición de la cookie
    if (board[position.row][position.col] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [position, board]);

  useEffect(() => {
    // Cada turno, Piggy tiene un 40% de probabilidad de cambiar a A*
    const chance = Math.random();
    if (chance < 0.4) {
      setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [position]);

  const moveToKermit = () => {
    // Si Piggy está usando A*, moverla hacia Kermit (Puedes implementar A* aquí)
    if (useAStar) {
      console.log("Piggy está usando A*");
      // Usa el algoritmo A* para encontrar el camino hacia Kermit
      const path = aStar(board, position, kermitPosition, hasCookieBoost);

      if (path && path.length > 0) {
        move(path[0]); // Mueve a Piggy a la siguiente posición en el camino
      } else {
        console.warn("No se encontró un camino hacia Kermit con A*.");
      }
    } else {
      console.log("Piggy está usando BFS (amplitud)");
      // Implementa la búsqueda en amplitud (BFS) para encontrar a Kermit
      const path = bfs(board, position, kermitPosition);

      // Si se encuentra un camino, mueve a Piggy al siguiente paso
      if (path && path.length > 1) {
        move(path[1]); // Mueve a Piggy al siguiente paso del camino
      } else {
        console.warn("No se encontró un camino hacia Kermit con Amplitud.");
      }
    }
  };

  return { position, moveToKermit, useAStar };
}
