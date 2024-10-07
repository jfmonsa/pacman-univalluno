import { useState } from "react";
import { cellType, positionType } from "../utils/types";

export function useBoard(
  initialBoard: cellType[][],
  kermitPosition: positionType,
  piggyPosition: positionType,
  elmoPosition: positionType
) {
  const [board, setBoard] = useState(initialBoard);

  const updateBoard = () => {
    const newBoard = board.map((row: cellType[]) => row.slice()); // Crea una copia del tablero
    // Limpia las posiciones anteriores de Kermit y Piggy
    for (const row of newBoard) {
      row.forEach((cell: cellType, i: number) => {
        if (cell === "kermit" || cell === "piggy") row[i] = "empty";
      });
    }
    // Coloca a Kermit, Piggy y Elmo en las posiciones correctas
    newBoard[kermitPosition.row][kermitPosition.col] = "kermit";
    newBoard[piggyPosition.row][piggyPosition.col] = "piggy";
    newBoard[elmoPosition.row][elmoPosition.col] = "elmo";
    setBoard(newBoard);
  };

  return { board, updateBoard };
}
