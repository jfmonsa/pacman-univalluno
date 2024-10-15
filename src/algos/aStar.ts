import { cellType, positionType, TreeNode } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function aStar(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  hasCookieBoost: boolean
): { path: positionType[] | null; tree: TreeNode } {
  const costMultiplier = hasCookieBoost ? 0.5 : 1; // Costo después de la galleta
  const openList = [{ ...start, g: 0, f: manhattanDistance(start, goal) }]; // Lista de nodos por explorar
  const closedSet = new Set<string>(); // Casillas ya exploradas

  const cameFrom: Record<
    string,
    { row: number; col: number; g: number; f: number }
  > = {}; // Para reconstruir el camino

  const key = (pos: { row: number; col: number }) => `${pos.row},${pos.col}`; // Llave única para cada casilla

  const tree: TreeNode = { data: { v: key(start) }, children: [] };
  const nodeMap = new Map<string, TreeNode>();
  nodeMap.set(key(start), tree);

  while (openList.length > 0) {
    // Ordena la lista abierta por el valor f (g + heurística)
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!; // El nodo con el valor f más bajo

    // Si Piggy ha llegado a Kermit (el objetivo)
    if (current.row === goal.row && current.col === goal.col) {
      const path = [];
      let pos = current;
      while (key(pos) !== key(start)) {
        path.push({ row: pos.row, col: pos.col });
        pos = cameFrom[key(pos)];
      }
      path.reverse();
      console.log("Camino encontrado:", path);
      return { path, tree };
    }

    closedSet.add(key(current));

    // Explora las direcciones en el orden definido
    for (const dir of operatorsOrder) {
      const newRow = current.row + dir.row;
      const newCol = current.col + dir.col;

      // Verifica los límites del tablero y evita obstáculos
      const isInBounds =
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length;

      if (
        isInBounds &&
        !closedSet.has(key({ row: newRow, col: newCol })) &&
        board[newRow][newCol] !== "wall" // Evita muros
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
          nodeMap.get(key(current))!.children!.push({ node: newNode });
          nodeMap.set(key(neighbor), newNode);
        }
      }
    }
  }
  return { path: null, tree }; // Si no se encuentra camino
}

function manhattanDistance(pos1: positionType, pos2: positionType): number {
  return Math.abs(pos1.row + pos1.col - pos2.row - pos2.col);
}
