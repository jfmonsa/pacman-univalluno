export function aStar(
  board: string[][],
  start: { x: number; y: number },
  goal: { x: number; y: number },
  hasCookieBoost: boolean
) {
  const directions = [
    { x: -1, y: 0 }, // Arriba
    { x: 0, y: 1 }, // Derecha
    { x: 1, y: 0 }, // Abajo
    { x: 0, y: -1 }, // Izquierda
  ];

  const costMultiplier = hasCookieBoost ? 0.5 : 1; // Costo después de la galleta
  const openList = [{ ...start, g: 0, f: manhattanDistance(start, goal) }]; // Lista de nodos por explorar
  const closedSet = new Set<string>(); // Casillas ya exploradas

  const cameFrom: Record<
    string,
    { x: number; y: number; g: number; f: number }
  > = {}; // Para reconstruir el camino

  const key = (pos: { x: number; y: number }) => `${pos.x},${pos.y}`; // Llave única para cada casilla

  while (openList.length > 0) {
    // Ordena la lista abierta por el valor f (g + heurística)
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!; // El nodo con el valor f más bajo

    // Si Piggy ha llegado a Kermit (el objetivo)
    if (current.x === goal.x && current.y === goal.y) {
      const path = [];
      let pos = current;
      while (key(pos) !== key(start)) {
        path.push({ x: pos.x, y: pos.y });
        pos = cameFrom[key(pos)];
      }
      path.reverse();
      return path;
    }

    closedSet.add(key(current)); // Marca como explorado

    // Explora las direcciones posibles
    for (const dir of directions) {
      const neighbor = { x: current.x + dir.x, y: current.y + dir.y };

      // Verifica los límites del tablero y si la casilla no es un obstáculo
      if (
        neighbor.x >= 0 &&
        neighbor.x < board.length &&
        neighbor.y >= 0 &&
        neighbor.y < board[0].length &&
        board[neighbor.x][neighbor.y] !== "wall" &&
        !closedSet.has(key(neighbor)) // No hemos explorado esta casilla
      ) {
        const tentative_g = current.g + costMultiplier; // Costo para llegar a este vecino
        const f = tentative_g + manhattanDistance(neighbor, goal); // Costo total (g + h)

        // Si ya hay un nodo en la lista abierta con esta posición y menor f, lo saltamos
        const existing = openList.find(
          (n) => n.x === neighbor.x && n.y === neighbor.y
        );
        if (existing && existing.f <= f) continue;

        // Actualizamos el nodo
        openList.push({ ...neighbor, g: tentative_g, f });
        cameFrom[key(neighbor)] = { ...current, g: current.g, f: current.f }; // Almacena el camino de regreso
      }
    }
  }

  return null; // Si no hay camino
}

// Heurística de Manhattan para calcular la distancia entre dos puntos
function manhattanDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
