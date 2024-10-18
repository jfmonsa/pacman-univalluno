import {
  isNotWall,
  isPosInBounds,
  isSamePosition,
} from "../utils/positionsAux";
import { posToString } from "../utils/posToString";
import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function aStar(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  hasCookieBoost: boolean,
  treeBuilderCallback?: (
    parentNode: positionType,
    currentPos: positionType
  ) => void
): positionType[] | null {
  // Cost after the cookie boost
  const costMultiplier = hasCookieBoost ? 0.5 : 1;

  // Node list to explore
  const openList = [{ ...start, g: 0, f: manhattanDistance(start, goal) }];

  // Visited nodes
  const closedSet = new Set<string>();

  // For reconstructing the path
  const cameFrom: Record<
    string,
    { row: number; col: number; g: number; f: number }
  > = {};

  while (openList.length > 0) {
    // Gets the node with the lowest f value
    //  - Sorts the opened nodes list by the value f = g + h; g = acumulated cost, h = heuristic
    //  TODO: Implement a priority queue to to improve time complexity from O(n*log n) to O(log n)
    openList.sort((a, b) => a.f - b.f);
    const currentPos = openList.shift()!;

    // If Piggy reaches Kermit (the goal) -> reconstruct the path
    if (isSamePosition(currentPos, goal)) {
      const path = [];
      let pos = currentPos;
      while (posToString(pos) !== posToString(start)) {
        path.push({ row: pos.row, col: pos.col });
        pos = cameFrom[posToString(pos)];
      }
      path.reverse();
      return path;
    }

    closedSet.add(posToString(currentPos));

    // Explores the directions in the defined order
    for (const dir of operatorsOrder) {
      const nextPos = {
        row: currentPos.row + dir.row,
        col: currentPos.col + dir.col,
      };

      if (
        isPosInBounds(nextPos, board) &&
        !closedSet.has(posToString(nextPos)) &&
        isNotWall(nextPos, board)
      ) {
        const g = currentPos.g + 1 * costMultiplier;
        const f = g + manhattanDistance(nextPos, goal);

        const neighbor = { ...nextPos, g, f };

        // If the neighbor is not in the open list
        if (
          !openList.some(
            (node) => node.row === nextPos.row && node.col === nextPos.col
          )
        ) {
          // Adds the neighbor to the open list
          openList.push(neighbor);
          // Adds the neighbor to the cameFrom list
          cameFrom[posToString(neighbor)] = currentPos;

          // If callback is provided, call it to construct the tree
          if (treeBuilderCallback) {
            treeBuilderCallback(currentPos, neighbor);
          }
        }
      }
    }
  }
  // If there is no path
  return null;
}

function manhattanDistance(pos1: positionType, pos2: positionType): number {
  return Math.abs(pos1.row + pos1.col - pos2.row - pos2.col);
}
