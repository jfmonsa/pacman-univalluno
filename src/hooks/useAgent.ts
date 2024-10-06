import { useState } from "react";

export function useAgent(
  initialPosition: { x: number; y: number },
  board: string[][]
) {
  const [position, setPosition] = useState(initialPosition);

  // TODO: realmente no estamos usando esta función eliminarla
  const getValidMoves = () => {
    const { x, y } = position;
    const moves = [];
    if (x > 0) moves.push({ x: x - 1, y });
    if (x < board.length - 1) moves.push({ x: x + 1, y });
    if (y > 0) moves.push({ x, y: y - 1 });
    if (y < board[0].length - 1) moves.push({ x, y: y + 1 });
    return moves;
  };

  const move = (newPosition: { x: number; y: number }) => {
    setPosition(newPosition);
  };

  return { position, getValidMoves, move };
}
