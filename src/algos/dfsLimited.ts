import { isPosInBounds } from "../utils/isPosInBounds";
import { posToString } from "../utils/posToString";
import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function depthLimitedDFS(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  depthLimit: number,
  avoidingLoopsDFS: boolean,
  callback?: (parentNode: any, currentPos: string) => any
): positionType[] | null {
  const visited = new Set<string>();

  function dfs(
    current: positionType,
    depth: number,
    parentNode: any
  ): positionType[] | null {
    // Base case
    if (depth > depthLimit) return null;
    if (current.row === goal.row && current.col === goal.col) return [current];

    if (avoidingLoopsDFS) {
      visited.add(posToString(current));
    }

    // Recusive cases
    for (const move of operatorsOrder) {
      const nextPos = {
        row: current.row + move.row,
        col: current.col + move.col,
      };

      if (
        isPosInBounds(nextPos, board) &&
        (!avoidingLoopsDFS || !visited.has(posToString(nextPos))) &&
        board[nextPos.row][nextPos.col] !== "wall"
      ) {
        let nextParentNode = parentNode;

        // If callback is provided, it will be called to construct the tree
        if (callback) {
          nextParentNode = callback(parentNode, posToString(nextPos));
        }

        const path = dfs(nextPos, depth + 1, nextParentNode);
        if (path) return [current, ...path];
      }
    }
    return null;
  }

  return dfs(start, 0, null);
}
