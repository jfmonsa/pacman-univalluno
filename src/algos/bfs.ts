// Función de búsqueda en amplitud (BFS)
export function bfs(
  board: string[][],
  start: { x: number; y: number },
  goal: { x: number; y: number }
) {
  const directions = [
    { x: -1, y: 0 }, // Arriba
    { x: 0, y: 1 }, // Derecha
    { x: 1, y: 0 }, // Abajo
    { x: 0, y: -1 }, // Izquierda
  ];

  const queue = [[start]]; // La cola almacena rutas completas
  const visited = new Set([`${start.x},${start.y}`]);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const { x, y } = path[path.length - 1];

    // Si Piggy ha alcanzado a Kermit, retorna el camino
    if (x === goal.x && y === goal.y) {
      return path;
    }

    // Explora las direcciones en el orden definido
    for (const dir of directions) {
      const newX = x + dir.x;
      const newY = y + dir.y;

      // Verifica los límites del tablero y evita obstáculos
      if (
        newX >= 0 &&
        newX < board.length && // Límites de filas
        newY >= 0 &&
        newY < board[0].length && // Límites de columnas
        !visited.has(`${newX},${newY}`) &&
        board[newX][newY] !== "wall" // Evita muros
      ) {
        visited.add(`${newX},${newY}`);
        queue.push([...path, { x: newX, y: newY }]); // Agrega la nueva ruta a la cola
      }
    }
  }

  return null; // Si no se encuentra camino
}
