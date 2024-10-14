import { useState, useEffect } from "react";
import { cellType, positionType, TreeNode } from "../utils/types";
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
  const [piggyTree, setPiggyTree] = useState<TreeNode | null>(null);
  const [piggyPath, setPiggyPath] = useState<positionType[]>([]);

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
    let path: positionType[] | null = null;
    let tree: TreeNode | null = null;

    if (useAStar) {
      console.log("Piggy está usando A*");
      const result = aStar(board, piggyPosition, kermitPosition, hasCookieBoost);
      path = result.path;
      tree = result.tree;
    } else {
      console.log("Piggy está usando BFS (amplitud)");
      const result = bfs(board, piggyPosition, kermitPosition);
      path = result.path;
      tree = result.tree;
    }

    if (path && path.length > 0) {
      setPiggyPath(path);
      setPiggyPosition(path[0]);
      setPiggyTree(tree);
    } else {
      console.warn("No se encontró un camino hacia Kermit.");
    }
  };

  return { moveToKermit, piggyTree, piggyPath, useAStar };
}