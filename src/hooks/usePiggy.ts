import { useState, useEffect, useCallback } from "react";
import { cellType, positionType, TreeNode } from "../utils/types";
import { aStar } from "../algos/aStar";
import { bfs } from "../algos/bfs";
import { TreeBuilderIterative } from "../utils/TreeBuilder";

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

  // Checks if Piggy is in the same position as the cookie
  useEffect(() => {
    if (board[piggyPosition.row][piggyPosition.col] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [piggyPosition, board]);

  // 40% chance of using A* algorithm
  useEffect(() => {
    const chance = Math.random();
    if (chance < 0.4) {
      setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [piggyPosition, kermitPosition]);

  const moveToKermit = useCallback(() => {
    const treeBuilder = new TreeBuilderIterative(piggyPosition);

    const addNodeCallback = (
      parentNode: positionType,
      currentPos: positionType
    ) => {
      treeBuilder.addNode(parentNode, currentPos);
    };

    const timeBegin = performance.now();

    const path = useAStar
      ? aStar(
          board,
          piggyPosition,
          kermitPosition,
          hasCookieBoost,
          addNodeCallback
        )
      : bfs(board, piggyPosition, kermitPosition, addNodeCallback);

    const timeEnd = performance.now();

    setAlgoStateVisualization({
      tree: treeBuilder.getTree(),
      nodeCount: treeBuilder.getNodeCount(),
      algoTime: timeEnd - timeBegin,
    });

    if (useAStar && path && path.length > 0) {
      setPiggyPath(path);
      setPiggyPosition(path[0]);
    } else if (!useAStar && path && path.length > 1) {
      setPiggyPosition(path[1]);
      setPiggyPath(path);
    } else {
      console.warn(
        `No se encontró un camino hacia Kermit, con: ${useAStar ? "A*" : "BFS"}`
      );
    }
  }, [
    useAStar,
    board,
    piggyPosition,
    kermitPosition,
    hasCookieBoost,
    setPiggyPosition,
  ]);

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
