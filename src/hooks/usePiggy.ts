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
  const [useAStar, setUseAStar] = useState(false);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);
  const [piggyPath, setPiggyPath] = useState<positionType[]>([]);
  // tree for algo visualization
  const [piggyTree, setPiggyTree] = useState<TreeNode | null>(null);
  const [piggyNnodes, setPiggyNnodes] = useState(0);
  const [piggyAlgoTime, setPiggyAlgoTime] = useState(0);

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
      const { path, tree, piggyNnodes, piggyAlgoTime } = aStar(
        board,
        piggyPosition,
        kermitPosition,
        hasCookieBoost
      );

      setPiggyTree(tree);
      setPiggyNnodes(piggyNnodes);
      setPiggyAlgoTime(piggyAlgoTime);

      if (path && path.length > 0) {
        setPiggyPath(path);
        setPiggyPosition(path[0]); // Mueve a Piggy a la siguiente posición en el camino
      } else {
        console.warn("No se encontró un camino hacia Kermit con A*.");
      }
    } else {
      const { path, tree, piggyNnodes, piggyAlgoTime } = bfs(
        board,
        piggyPosition,
        kermitPosition
      );
      setPiggyAlgoTime(piggyAlgoTime);
      setPiggyTree(tree);
      setPiggyNnodes(piggyNnodes);

      if (path && path.length > 1) {
        setPiggyPosition(path[1]);
        setPiggyPath(path);
      } else {
        console.warn("No se encontró un camino hacia Kermit con Amplitud.");
      }
    }
  };

  return {
    kermitPosition,
    moveToKermit,
    piggyTree,
    piggyPath,
    useAStar,
    piggyNnodes,
    piggyAlgoTime,
  };
}
