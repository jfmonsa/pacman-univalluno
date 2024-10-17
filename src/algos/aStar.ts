import { cellType, positionType, TreeNode } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function aStar(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  hasCookieBoost: boolean
): {
  path: positionType[] | null;
  tree: TreeNode;
  piggyNnodes: number;
  piggyAlgoTime: number;
} {
  const costMultiplier = hasCookieBoost ? 0.5 : 1; // Cost after the cookie boost
  const openList = [{ ...start, g: 0, f: manhattanDistance(start, goal) }]; // Node list to explore
  const closedSet = new Set<string>(); // Visited nodes

  const cameFrom: Record<
    string,
    { row: number; col: number; g: number; f: number }
  > = {}; // For reconstructing the path

  const key = (pos: { row: number; col: number }) => `${pos.row},${pos.col}`; // Unique key for each node

  const tree: TreeNode = { data: { v: key(start) }, children: [] };
  let piggyNnodes = 1;
  const beginTime = Date.now();

  const nodeMap = new Map<string, TreeNode>();
  nodeMap.set(key(start), tree);

  while (openList.length > 0) {
    // Sorts the opened nodes list by the value f = (g + heuristic)
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!; // Gets the node with the lowest f value

    // If Piggy reaches Kermit (the goal)
    if (current.row === goal.row && current.col === goal.col) {
      const path = [];
      let pos = current;
      while (key(pos) !== key(start)) {
        path.push({ row: pos.row, col: pos.col });
        pos = cameFrom[key(pos)];
      }
      path.reverse();
      return { path, tree, piggyNnodes, piggyAlgoTime: Date.now() - beginTime };
    }

    closedSet.add(key(current));

    // Explores the directions in the defined order
    for (const dir of operatorsOrder) {
      const newRow = current.row + dir.row;
      const newCol = current.col + dir.col;

      // Checks if the new position is within the board and is not an obstacle
      const isInBounds =
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length;

      if (
        isInBounds &&
        !closedSet.has(key({ row: newRow, col: newCol })) &&
        board[newRow][newCol] !== "wall" // Avoids walls
      ) {
        const g = current.g + 1 * costMultiplier;
        const f = g + manhattanDistance({ row: newRow, col: newCol }, goal);

        const neighbor = { row: newRow, col: newCol, g, f };

        if (
          !openList.some((node) => node.row === newRow && node.col === newCol)
        ) {
          openList.push(neighbor);
          cameFrom[key(neighbor)] = current;

          const newNode: TreeNode = {
            data: { v: key(neighbor) },
            children: [],
          };
          piggyNnodes++;
          nodeMap.get(key(current))!.children!.push({ node: newNode });
          nodeMap.set(key(neighbor), newNode);
        }
      }
    }
  }
  return {
    path: null,
    tree,
    piggyNnodes,
    piggyAlgoTime: Date.now() - beginTime,
  }; // If there is no path
}

function manhattanDistance(pos1: positionType, pos2: positionType): number {
  return Math.abs(pos1.row + pos1.col - pos2.row - pos2.col);
}
