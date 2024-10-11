import { cellType, positionType } from "./types";

export function findPosition(board: cellType[][], element: cellType): positionType{
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === element) {
          return { row, col };
        }
      }
    }
    //TODO: Maybe implement an error handler? Though, this shouldn't ever happen
    throw Error(`Element ${element} not found in board`);
  }