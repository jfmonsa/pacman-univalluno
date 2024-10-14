import { cellType, positionType } from "../utils/types";

export function useBoard(
  board: cellType[][],
  setBoard: (board: cellType[][]) => void,
  kermitPosition: positionType,
  piggyPosition: positionType,
  elmoPosition: positionType,
  onGameEnd: (reason: string) => void // Callback para detener el juego
) {
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

    // endGame
    // validar si kermit y piggy estan en la misma posicion
    const isKermitAndPiggyInSamePosition =
      kermitPosition.row === piggyPosition.row &&
      kermitPosition.col === piggyPosition.col;

    const isKermitAndElmoInSamePosition =
      kermitPosition.row === elmoPosition.row &&
      kermitPosition.col === elmoPosition.col;

    if (isKermitAndPiggyInSamePosition) {
      onGameEnd("Piggy ha atrapado a Kermit");
    }

    // validar si kermit y elmo estan en la misma posicion
    if (isKermitAndElmoInSamePosition) {
      onGameEnd("Kermit ha atrapado a Elmo");
    }
  };

  return { updateBoard };
}
