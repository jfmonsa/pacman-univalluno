import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";

export function useKermit(
  initialPosition: { x: number; y: number },
  board: string[][],
  elmoPosition: { x: number; y: number }
) {
  const { position, getValidMoves, move } = useAgent(initialPosition, board);
  const [hasCookieBoost, setHasCookieBoost] = useState(false);

  useEffect(() => {
    // Check if Kermit steps on the cookie
    if (board[position.x][position.y] === "cookie") {
      setHasCookieBoost(true);
    }
  }, [position, board]);

  const moveToElmo = () => {
    const validMoves = getValidMoves();
    // Implementación básica de búsqueda limitada por profundidad
    for (const movePos of validMoves) {
      if (movePos.x === elmoPosition.x && movePos.y === elmoPosition.y) {
        move(movePos); // Mueve a Kermit hacia Elmo
        return;
      }
    }
    // Movimiento aleatorio si no está en elmoPosition
    move(validMoves[Math.floor(Math.random() * validMoves.length)]);
  };

  return { position, moveToElmo, hasCookieBoost };
}
