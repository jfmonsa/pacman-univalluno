import { cellType, positionType } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

export function aStar(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  hasCookieBoost: boolean
) {

  const costMultiplier = hasCookieBoost ? 0.5 : 1; // Costo después de la galleta
  const openList = [{ ...start, g: 0, f: manhattanDistance(start, goal) }]; // Lista de nodos por explorar
  const closedSet = new Set<string>(); // Casillas ya exploradas

  const cameFrom: Record<
    string,
    { row: number; col: number; g: number; f: number }
  > = {}; // Para reconstruir el camino

  const key = (pos: { row: number; col: number }) => `${pos.row},${pos.col}`; // Llave única para cada casilla

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
      return path;
    }

    closedSet.add(key(current)); // Marca como explorado

    // Explora las direcciones posibles
    for (const dir of operatorsOrder) {
      const neighbor = { row: current.row + dir.row, col: current.col + dir.col };

      // Verifica los límites del tablero col si la casilla no es un obstáculo
      if (
        neighbor.row >= 0 &&
        neighbor.row < board.length &&
        neighbor.col >= 0 &&
        neighbor.col < board[0].length &&
        board[neighbor.row][neighbor.col] !== "wall" &&
        !closedSet.has(key(neighbor)) // No hemos explorado esta casilla
      ) {
        const tentative_g = current.g + costMultiplier; // Costo para llegar a este vecino
        const f = tentative_g + manhattanDistance(neighbor, goal); // Costo total (g + h)

        // Si ya hay un nodo en la lista abierta con esta posición col menor f, lo saltamos
        const existing = openList.find(
          (n) => n.row === neighbor.row && n.col === neighbor.col
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
  a: positionType,
  b: positionType
) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}
