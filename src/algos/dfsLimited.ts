import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

// DFS limitado por profundidad
export function depthLimitedDFS(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  depthLimit: number
): positionType[] | null {
  const visited = new Set<string>();

  // Convierte una posición a una cadena única para usar en Set
  const posToString = (pos: { row: number; col: number }) => `${pos.row},${pos.col}`;

  function dfs(
    current: { row: number; col: number },
    depth: number
  ): { row: number; col: number }[] | null {
    if (depth > depthLimit) return null;
    if (current.row === goal.row && current.col === goal.col) return [current];

    visited.add(posToString(current));

    for (const move of operatorsOrder) {
      const nextPos = { row: current.row + move.row, col: current.col + move.col };

      // Asegúrate de que la siguiente posición está dentro de los límites del tablero
      if (
        nextPos.row >= 0 &&
        nextPos.row < board.length &&
        nextPos.col >= 0 &&
        nextPos.col < board[0].length &&
        !visited.has(posToString(nextPos)) &&
        board[nextPos.row][nextPos.col] !== "wall" // Evita los obstáculos
      ) {
        const path = dfs(nextPos, depth + 1);
        if (path) {
          return [current, ...path];
        }
      }
    }

    return null;
  }

  return dfs(start, 0);
}
