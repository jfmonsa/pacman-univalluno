import { useState, useEffect } from "react";
import { cellType, positionType } from "../utils/types";
import { aStar } from "../algos/aStar";
import { bfs } from "../algos/bfs";

export function usePiggy(
  piggyPosition: positionType,
  setPiggyPosition: (position: positionType) => void,
  board: cellType[][],
  kermitPosition: positionType
) {
  // const { position, move } = useAgent(initialPosition, board);
  const [useAStar, setUseAStar] = useState(false);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);

  useEffect(() => {
    // Verifica si Kermit está en la posición de la cookie
    if (board[piggyPosition.row][piggyPosition.col] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [piggyPosition, board]);

  useEffect(() => {
    const chance = Math.random();
    if (chance < 0.4) {
      setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [piggyPosition, kermitPosition]);

  const moveToKermit = () => {
    if (useAStar) {
      console.log("Piggy está usando A*");
      // Usa el algoritmo A* para encontrar el camino hacia Kermit
      const { path, tree } = aStar(board, piggyPosition, kermitPosition, hasCookieBoost);

      if (path && path.length > 0) {
        setPiggyPosition(path[0]); // Mueve a Piggy a la siguiente posición en el camino

        localStorage.setItem("treePiggyToKermit", JSON.stringify(tree));
        localStorage.setItem("pathPiggyToKermit", JSON.stringify(path));
      } else {
        console.warn("No se encontró un camino hacia Kermit con A*.");
      }
    } else {
      console.log("Piggy está usando BFS (amplitud)");
      // Implementa la búsqueda en amplitud (BFS) para encontrar a Kermit
      const { path, tree } = bfs(board, piggyPosition, kermitPosition);

      if (path && path.length > 1) {
        setPiggyPosition(path[1]);
        localStorage.setItem("treePiggyToKermit", JSON.stringify(tree));
        localStorage.setItem("pathPiggyToKermit", JSON.stringify(path));
      } else {
        console.warn("No se encontró un camino hacia Kermit con Amplitud.");
      }
    }
  };

  return { kermitPosition, moveToKermit, useAStar };
}
