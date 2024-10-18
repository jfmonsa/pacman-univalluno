import { cellType, positionType } from "../utils/types";

/**  Check if a position is within the board (valid position) */
export const isPosInBounds = (pos: positionType, board: cellType[][]) => {
  return (
    pos.row >= 0 &&
    pos.row < board.length &&
    pos.col >= 0 &&
    pos.col < board[0].length
  );
};
