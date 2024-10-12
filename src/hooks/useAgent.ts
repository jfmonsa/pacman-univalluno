import { useState } from "react";
import { cellType, positionType } from "../utils/types";

export function useAgent(initialPosition: positionType, board: cellType[][]) {
  const [position, setPosition] = useState(initialPosition);

  const move = (newPosition: positionType) => {
    setPosition(newPosition);
  };

  return { position, move };
}
