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
  // Tree for algorithm visualization
  const [algoStateVisualization, setAlgoStateVisualization] = useState({
    tree: null as TreeNode | null,
    nodeCount: 0,
    algoTime: 0,
  });

  useEffect(() => {
    // Checks if Piggy is in the same position as the cookie
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
      const timeBegin = performance.now();

      const { path, tree, piggyNnodes } = aStar(
        board,
        piggyPosition,
        kermitPosition,
        hasCookieBoost
      );
      const timeEnd = performance.now();

      setAlgoStateVisualization({
        tree,
        nodeCount: piggyNnodes,
        algoTime: timeEnd - timeBegin,
      });

      if (path && path.length > 0) {
        setPiggyPath(path);
        setPiggyPosition(path[0]); // Moves Piggy to the next position in the path
      } else {
        console.warn("No se encontró un camino hacia Kermit con A*.");
      }
    } else {
      const timeBegin = performance.now();
      const { path, tree, piggyNnodes } = bfs(
        board,
        piggyPosition,
        kermitPosition
      );
      const timeEnd = performance.now();
      setAlgoStateVisualization({
        tree,
        nodeCount: piggyNnodes,
        algoTime: timeEnd - timeBegin,
      });

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
    piggyPath,
    useAStar,
    piggyTree: algoStateVisualization.tree,
    piggyNnodes: algoStateVisualization.nodeCount,
    piggyAlgoTime: algoStateVisualization.algoTime,
  };
}
