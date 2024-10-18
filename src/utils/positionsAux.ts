import { cellType, positionType } from "./types";

/**  Check if a position is within the board (valid position) */
export const isPosInBounds = (pos: positionType, board: cellType[][]) => {
  return (
    pos.row >= 0 &&
    pos.row < board.length &&
    pos.col >= 0 &&
    pos.col < board[0].length
  );
};

export const isSamePosition = (pos1: positionType, pos2: positionType) => {
  return pos1.row === pos2.row && pos1.col === pos2.col;
};

export const isNotWall = (pos: positionType, board: cellType[][]) => {
  return board[pos.row][pos.col] !== "wall";
};
