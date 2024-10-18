import { isPosInBounds } from "../utils/isPosInBounds";
import { posToString } from "../utils/posToString";
import { cellType, positionType, TreeNode } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function bfs(
  board: cellType[][],
  start: positionType,
  goal: positionType
): {
  path: positionType[] | null;
  tree: TreeNode;
  piggyNnodes: number;
} {
  const queue = [[start]]; // The queue stores full paths
  const visited = new Set([`${start.row},${start.col}`]);

  const tree: TreeNode = { data: { v: posToString(start) }, children: [] };
  let piggyNnodes = 1;

  const nodeMap = new Map<string, TreeNode>();
  nodeMap.set(`${start.row},${start.col}`, tree);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const { row, col } = path[path.length - 1];
    const currentNode = nodeMap.get(`${row},${col}`);

    // If Piggy reaches Kermit, returns both the path and the tree
    if (row === goal.row && col === goal.col) {
      return { path, tree, piggyNnodes };
    }

    // Explores the directions in the defined order
    for (const dir of operatorsOrder) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      // Checks if the new position is within the board and is not an obstacle
      if (
        isPosInBounds({ row: newRow, col: newCol }, board) &&
        !visited.has(`${newRow},${newCol}`) &&
        board[newRow][newCol] !== "wall" // Avoids walls
      ) {
        visited.add(`${newRow},${newCol}`);
        const newNode: TreeNode = {
          data: { v: posToString({ row: newRow, col: newCol }) },
          children: [],
        };
        currentNode!.children!.push({ node: newNode });
        piggyNnodes++;
        nodeMap.set(`${newRow},${newCol}`, newNode);
        queue.push([...path, { row: newRow, col: newCol }]); // Adds the new path to the queue
      }
    }
  }

  // If there is no path
  return {
    path: null,
    tree,
    piggyNnodes,
  };
}