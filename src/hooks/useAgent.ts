import { useState } from "react";
import { cellType, positionType } from "../utils/types";


export function useAgent(
  initialPosition: positionType,
  board: cellType[][]
) {
  const [position, setPosition] = useState(initialPosition);

  // TODO: realmente no estamos usando esta función eliminarla
  const getValidMoves = () => {
    const { row, col } = position;
    const moves = [];
    if (row > 0) moves.push({ row: row - 1, col });
    if (row < board.length - 1) moves.push({ row: row + 1, col });
    if (col > 0) moves.push({ row, col: col - 1 });
    if (col < board[0].length - 1) moves.push({ row, col: col + 1 });
    return moves;
  };

  const move = (newPosition: positionType) => {
    setPosition(newPosition);
  };

  return { position, getValidMoves, move };
}
