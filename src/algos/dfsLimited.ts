// Movimientos en el orden Arriba, Derecha, Abajo, Izquierda
const MOVES = [
  { x: -1, y: 0 }, // Arriba
  { x: 0, y: 1 }, // Derecha
  { x: 1, y: 0 }, // Abajo
  { x: 0, y: -1 }, // Izquierda
];

// DFS limitado por profundidad
export function depthLimitedDFS(
  board: string[][],
  start: { x: number; y: number },
  goal: { x: number; y: number },
  depthLimit: number
): { x: number; y: number }[] | null {
  const visited = new Set<string>();

  // Convierte una posición a una cadena única para usar en Set
  const posToString = (pos: { x: number; y: number }) => `${pos.x},${pos.y}`;

  function dfs(
    current: { x: number; y: number },
    depth: number
  ): { x: number; y: number }[] | null {
    if (depth > depthLimit) return null;
    if (current.x === goal.x && current.y === goal.y) return [current];

    visited.add(posToString(current));

    for (const move of MOVES) {
      const nextPos = { x: current.x + move.x, y: current.y + move.y };

      // Asegúrate de que la siguiente posición está dentro de los límites del tablero
      if (
        nextPos.x >= 0 &&
        nextPos.x < board.length &&
        nextPos.y >= 0 &&
        nextPos.y < board[0].length &&
        !visited.has(posToString(nextPos)) &&
        board[nextPos.x][nextPos.y] !== "wall" // Evita los obstáculos
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
