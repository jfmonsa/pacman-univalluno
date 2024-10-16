import { cellType, positionType, TreeNode } from "../utils/types";
import { operatorsOrder } from "./operatorsOrderConst";

// DFS limitado por profundidad
export function depthLimitedDFS(
  board: cellType[][],
  start: positionType,
  goal: positionType,
  depthLimit: number,
  avoidingLoopsDFS: boolean,
  setKermitTree: (tree: TreeNode) => void,
  setKermitNnodes: (n: number) => void,
  setKermitAlgoTime: (time: number) => void
): positionType[] | null {
  // Estructura de datos para evitar posiciones ya visitadas

  const posToString = (pos: { row: number; col: number }) =>
    `${pos.row},${pos.col}`;

  const timeBegin = Date.now();
  let kermitNnodes = 1;
  const tree: TreeNode = { data: { v: posToString(start) }, children: [] };

  const visited = new Set<string>();

  function dfs(
    current: positionType,
    depth: number,
    parentNode: TreeNode
  ): positionType[] | null {
    // casos base
    if (depth > depthLimit) return null;
    if (current.row === goal.row && current.col === goal.col) return [current];

    visited.add(posToString(current));

    // Caso recursivo
    for (const move of operatorsOrder) {
      const nextPos = {
        row: current.row + move.row,
        col: current.col + move.col,
      };

      // validar que nextPos esta dentro de los limites del tablero
      const isInBounds =
        nextPos.row >= 0 &&
        nextPos.row < board.length &&
        nextPos.col >= 0 &&
        nextPos.col < board[0].length;

      // que no ha sido visitada y que no es un obstaculo si AvoidingLoopsDFS es true
      const ifIsAvodingLoopsTrueIsNotVisited = avoidingLoopsDFS
        ? !visited.has(posToString(nextPos))
        : true;

      if (
        isInBounds &&
        ifIsAvodingLoopsTrueIsNotVisited &&
        board[nextPos.row][nextPos.col] !== "wall" // Evita los obstáculos
      ) {
        // Crear nuevo nodo hijo
        const childNode: TreeNode = {
          data: { v: posToString(nextPos) },
          children: [],
        };

        // Anotar en el padre el enlace al nuevo hijo
        parentNode?.children!.push({
          node: childNode,
        });
        kermitNnodes++;

        // hacer llamado recursivo por cada hijo (movimiento que cumple con las condiciones)
        const path = dfs(nextPos, depth + 1, childNode);
        if (path) {
          return [current, ...path];
        }
      }
    }

    return null;
  }

  const path = dfs(start, 0, tree);
  const timeEnd = Date.now();
  setKermitAlgoTime(timeEnd - timeBegin);

  setKermitNnodes(kermitNnodes);
  setKermitTree(tree);
  return path;
}
