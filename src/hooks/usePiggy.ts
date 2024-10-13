import { useState, useEffect } from "react";
import { cellType, positionType } from "../utils/types";
import { useAgent } from "./useAgent";
import { aStar } from "../algos/aStar";
import { bfs } from "../algos/bfs";

export function usePiggy(
  initialPosition: positionType,
  board: cellType[][],
  kermitPosition: positionType
) {
  const { position, move } = useAgent(initialPosition, board);
  const [useAStar, setUseAStar] = useState(false);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);

  useEffect(() => {
    if (board[position.row][position.col] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [position, board]);

  useEffect(() => {
    const chance = Math.random();
    if (chance < 0.4) {
      setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [position, kermitPosition]);

  const moveToKermit = () => {
    if (useAStar) {
      console.log("Piggy está usando A*");
      const { path, tree } = aStar(board, position, kermitPosition, hasCookieBoost);

      if (path && path.length > 0) {
        move(path[0]);
        localStorage.setItem("treePiggyToKermit", JSON.stringify(tree));
        localStorage.setItem("pathPiggyToKermit", JSON.stringify(path));
      } else {
        console.warn("No se encontró un camino hacia Kermit con A*.");
      }
    } else {
      console.log("Piggy está usando BFS (amplitud)");
      const { path, tree } = bfs(board, position, kermitPosition);

      if (path && path.length > 1) {
        move(path[1]);
        localStorage.setItem("treePiggyToKermit", JSON.stringify(tree));
        localStorage.setItem("pathPiggyToKermit", JSON.stringify(path));
      } else {
        console.warn("No se encontró un camino hacia Kermit con Amplitud.");
      }
    }
  };

  return { position, moveToKermit, useAStar };
}