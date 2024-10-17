import { cellType } from "./types";

export function generateRandomBoard(rows: number, cols: number, wallPercentage: number): cellType[][] {
  const board: cellType[][] = Array.from({ length: rows }, () => Array(cols).fill("empty"));

  const placeRandomly = (element: cellType) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (board[row][col] === "empty") {
        board[row][col] = element;
        placed = true;
      }
    }
  };

  placeRandomly("elmo");
  placeRandomly("piggy");
  placeRandomly("kermit");
  placeRandomly("cookie");

  // Calculate the number of walls
  const totalCells = rows * cols;
  const wallCount = Math.floor(totalCells * wallPercentage);

  // Place walls
  for (let i = 0; i < wallCount; i++) {
    placeRandomly("wall");
  }

  return board;
}