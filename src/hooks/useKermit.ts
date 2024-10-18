import { useCallback, useEffect, useState } from "react";
import { depthLimitedDFS } from "../algos/dfsLimited";
import { cellType, positionType, TreeNode } from "../utils/types";
import { TreeBuilderRecursive } from "../utils/TreeBuilder";
import { posToString } from "../utils/posToString";

export function useKermit(
  kermitPosition: positionType,
  setKermitPosition: (position: positionType) => void,
  board: cellType[][],
  elmoPosition: positionType,
  avoidingLoopsDFS: boolean,
  numberOfCells: number,
  isBoardReset: boolean
) {
  const [path, setPath] = useState<positionType[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const DEPTH_LIMIT = Math.floor(numberOfCells / 2);

  // For the algorithm visualization
  const [algoStateVisualization, setAlgoStateVisualization] = useState({
    tree: null as TreeNode | null,
    nodeCount: 0,
    algoTime: 0,
  });

  const calculateNewPath = useCallback(() => {
    const start = kermitPosition;
    const treeBuilder = new TreeBuilderRecursive(start);

    const timeBegin = performance.now();
    const newPath = depthLimitedDFS(
      board,
      start,
      elmoPosition,
      DEPTH_LIMIT,
      avoidingLoopsDFS,
      (parentNode, currentPos) => treeBuilder.addNode(parentNode, currentPos)
    );
    const timeEnd = performance.now();

    setAlgoStateVisualization({
      tree: treeBuilder.getTree(),
      nodeCount: treeBuilder.getNodeCount(),
      algoTime: timeEnd - timeBegin,
    });

    if (newPath && newPath.length > 1) {
      setPath(newPath);
      setStepIndex(1);
    } else {
      console.warn(
        `Kermit no encontró un camino a Elmo. Verifica la profundidad: ${DEPTH_LIMIT}`
      );
    }
  }, [elmoPosition, avoidingLoopsDFS, DEPTH_LIMIT, board, kermitPosition]);

  const resetPathState = useCallback(() => {
    setPath([]);
    setStepIndex(0);
  }, []);

  // Move Kermit to the next position in the path
  const moveToElmo = () => {
    if (path.length > 1 && stepIndex < path.length) {
      setKermitPosition(path[stepIndex]);
      setStepIndex(stepIndex + 1);
    }
  };

  // Calculate a new path if current is empty or stepIndex is out of bounds
  useEffect(() => {
    if (path.length === 0 || stepIndex > path.length) {
      calculateNewPath();
    }
  }, [
    kermitPosition,
    elmoPosition,
    board,
    avoidingLoopsDFS,
    path.length,
    stepIndex,
    DEPTH_LIMIT,
    calculateNewPath,
  ]);

  // Clears the path if the board is reset
  useEffect(() => {
    resetPathState();
  }, [numberOfCells, isBoardReset, avoidingLoopsDFS, resetPathState]);

  return {
    moveToElmo,
    kermitTree: algoStateVisualization.tree,
    kermitNnodes: algoStateVisualization.nodeCount,
    kermitPath: path,
    kermitAlgoTime: algoStateVisualization.algoTime,
  };
}
