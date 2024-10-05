import { useState } from "react";

export function useBoard(
  initialBoard: string[][],
  kermitPosition: { x: number; y: number },
  piggyPosition: { x: number; y: number },
  elmoPosition: { x: number; y: number }
) {
  const [board, setBoard] = useState(initialBoard);

  const updateBoard = () => {
    const newBoard = board.map((row: string[]) => row.slice()); // Crea una copia del tablero
    // Limpia las posiciones anteriores de Kermit y Piggy
    for (const row of newBoard) {
      row.forEach((cell: string, i: number) => {
        if (cell === "kermit" || cell === "piggy") row[i] = "empty";
      });
    }
    // Coloca a Kermit, Piggy y Elmo en las posiciones correctas
    newBoard[kermitPosition.x][kermitPosition.y] = "kermit";
    newBoard[piggyPosition.x][piggyPosition.y] = "piggy";
    newBoard[elmoPosition.x][elmoPosition.y] = "elmo";
    setBoard(newBoard);
  };

  return { board, updateBoard };
}
