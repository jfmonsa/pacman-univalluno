import { cellType, positionType, TreeNode } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function bfs(
  board: cellType[][],
  start: positionType,
  goal: positionType
): { path: positionType[] | null, tree: TreeNode } {
  const queue = [[start]]; // La cola almacena rutas completas
  const visited = new Set([`${start.row},${start.col}`]);
  const tree: TreeNode = { data: { v: posToString(start) }, children: [] };
  const nodeMap = new Map<string, TreeNode>();
  nodeMap.set(`${start.row},${start.col}`, tree);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const { row, col } = path[path.length - 1];
    const currentNode = nodeMap.get(`${row},${col}`);

    // Si Piggy ha alcanzado a Kermit, retorna el camino y el árbol
    if (row === goal.row && col === goal.col) {
      return { path, tree };
    }

    // Explora las direcciones en el orden definido
    for (const dir of operatorsOrder) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      // Verifica los límites del tablero y evita obstáculos
      if (
        newRow >= 0 &&
        newRow < board.length && // Límites de filas
        newCol >= 0 &&
        newCol < board[0].length && // Límites de columnas
        !visited.has(`${newRow},${newCol}`) &&
        board[newRow][newCol] !== "wall" // Evita muros
      ) {
        visited.add(`${newRow},${newCol}`);
        const newNode: TreeNode = { data: { v: posToString({ row: newRow, col: newCol }) }, children: [] };
        currentNode!.children!.push({ node: newNode });
        nodeMap.set(`${newRow},${newCol}`, newNode);
        queue.push([...path, { row: newRow, col: newCol }]); // Agrega la nueva ruta a la cola
      }
    }
  }

  return { path: null, tree }; // Si no se encuentra camino
}

function posToString(pos: positionType): string {
  return `${pos.row},${pos.col}`;
}