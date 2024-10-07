import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

// Función de búsqueda en amplitud (BFS)
export function bfs(
  board: cellType[][],
  start: positionType,
  goal: positionType
) {


  const queue = [[start]]; // La cola almacena rutas completas
  const visited = new Set([`${start.row},${start.col}`]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const { row, col } = path[path.length - 1];

    // Si Piggy ha alcanzado a Kermit, retorna el camino
    if (row === goal.row && col === goal.col) {
      return path;
    }

    // Explora las direcciones en el orden definido
    for (const dir of operatorsOrder) {
      const newRow = row + dir.row;
      const newCol = col + dir.col;

      // Verifica los límites del tablero col evita obstáculos
      if (
        newRow >= 0 &&
        newRow < board.length && // Límites de filas
        newCol >= 0 &&
        newCol < board[0].length && // Límites de columnas
        !visited.has(`${newRow},${newCol}`) &&
        board[newRow][newCol] !== "wall" // Evita muros
      ) {
        visited.add(`${newRow},${newCol}`);
        queue.push([...path, { row: newRow, col: newCol }]); // Agrega la nueva ruta a la cola
      }
    }
  }

  return null; // Si no se encuentra camino
}
