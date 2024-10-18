import {
  isNotWall,
  isPosInBounds,
  isSamePosition,
} from "../utils/positionsAux";
import { posToString } from "../utils/posToString";
import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function bfs(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  callbackTreeBuilder?: (
    parentNode: positionType,
    currentPos: positionType
  ) => any
): positionType[] | null {
  const queue = [[start]]; // The queue stores full paths
  const visited = new Set([`${start.row},${start.col}`]);

  while (queue.length > 0) {
    // Get current node
    const path = queue.shift()!;
    const currentPos = path[path.length - 1];

    // If Piggy reaches Kermit, returns both the path and the tree
    if (isSamePosition(currentPos, goal)) {
      return path;
    }

    // Explores the directions in the defined order
    for (const dir of operatorsOrder) {
      // get next node to explore
      const nextPos = {
        row: currentPos.row + dir.row,
        col: currentPos.col + dir.col,
      };

      // check if position is valid: in bounds, not visited, not a wall
      if (
        isPosInBounds(nextPos, board) &&
        !visited.has(posToString(nextPos)) &&
        isNotWall(nextPos, board)
      ) {
        visited.add(posToString(nextPos));

        // If callback is provided, it will be called to construct the tree
        if (callbackTreeBuilder) {
          callbackTreeBuilder(currentPos, nextPos);
        }
        queue.push([...path, nextPos]); // Adds the new path to the queue
      }
    }
  }

  // If there is no path
  return null;
}
