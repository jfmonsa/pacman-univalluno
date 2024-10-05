import { useEffect, useState } from "react";
import { useAgent } from "./useAgent";

export function usePiggy(
  initialPosition: { x: number; y: number },
  board: string[][],
  kermitPosition: { x: number; y: number }
) {
  const { position, getValidMoves, move } = useAgent(initialPosition, board);
  const [useAStar, setUseAStar] = useState(false);

  useEffect(() => {
    // Cada turno, Piggy tiene un 40% de probabilidad de cambiar a A*
    const chance = Math.random();
    if (chance < 0.4) {
      setUseAStar(true);
    } else {
      setUseAStar(false);
    }
  }, [position]);

  const moveToKermit = () => {
    const validMoves = getValidMoves();
    // Si Piggy está usando A*, moverla hacia Kermit
    if (useAStar) {
      // Aquí puedes implementar la lógica de A* si lo deseas
      console.log("Piggy está usando A*");
    } else {
      // Implementación básica de búsqueda por amplitud
      for (const movePos of validMoves) {
        if (movePos.x === kermitPosition.x && movePos.y === kermitPosition.y) {
          move(movePos); // Mueve a Piggy hacia Kermit
          return;
        }
      }
      move(validMoves[Math.floor(Math.random() * validMoves.length)]);
    }
  };

  return { position, moveToKermit, useAStar };
}
