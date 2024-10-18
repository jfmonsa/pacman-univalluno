import { useState } from "react";
import { cellType, positionType } from "../utils/types";
import { isSamePosition } from "../utils/positionsAux";

export function useBoard(
  board: cellType[][],
  setBoard: (board: cellType[][]) => void,
  kermitPosition: positionType,
  piggyPosition: positionType,
  elmoPosition: positionType,
  onGameEnd: (reason: string) => void // Callback for stopping the game
) {
  const [kermitPrevPosition, setKermitPrevPosition] =
    useState<positionType>(kermitPosition);
  const [piggyPrevPosition, setPiggyPrevPosition] =
    useState<positionType>(piggyPosition);

  const updateBoard = () => {
    const newBoard = board.map((row: cellType[]) => row.slice()); // Creates a copy of the board
    // Clears the previous positions of Kermit and Piggy
    for (const row of newBoard) {
      row.forEach((cell: cellType, i: number) => {
        if (cell === "kermit" || cell === "piggy") row[i] = "empty";
      });
    }
    setKermitPrevPosition(kermitPosition);
    setPiggyPrevPosition(piggyPosition);
    // Puts Kermit, Piggy and Elmo in their new positions
    newBoard[kermitPosition.row][kermitPosition.col] = "kermit";
    newBoard[piggyPosition.row][piggyPosition.col] = "piggy";
    newBoard[elmoPosition.row][elmoPosition.col] = "elmo";
    setBoard(newBoard);

    // endGame cases:
    // 1. Checks if Kermit and Elmo are in the same position
    if (isSamePosition(kermitPosition, elmoPosition)) {
      onGameEnd("Kermit ha atrapado a Elmo");
    }

    // 2. Checks if Kermit and Piggy are in the same position
    if (isSamePosition(piggyPosition, elmoPosition)) {
      onGameEnd("Piggy ha atrapado a Kermit");
    }

    // 3. Edge case: Checks if Kermit and Piggy have crossed paths
    if (
      isSamePosition(kermitPosition, piggyPrevPosition) &&
      isSamePosition(kermitPrevPosition, piggyPosition)
    ) {
      onGameEnd("Kermit se ha cruzado de frente con Piggy");
    }
  };

  return { updateBoard };
}
