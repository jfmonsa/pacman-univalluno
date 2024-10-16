import { ReactNode } from "react";
import { positionType } from "../../utils/types";

export const FormattedPath = ({
  path,
  currentPosition,
}: {
  path: positionType[];
  currentPosition: positionType;
}): ReactNode => {
  return (
    <code>
      {path.map((pos, index) => {
        const isCurrentPosition =
          currentPosition.row === pos.row && currentPosition.col === pos.col;

        // Devuelve el nodo como JSX, incluyendo un span para la posición actual
        return (
          <span key={index}>
            {isCurrentPosition ? (
              <span style={{ color: "yellow" }}>
                ({pos.row},{pos.col})
              </span>
            ) : (
              `(${pos.row},${pos.col})`
            )}
            {index < path.length - 1 && "->"}
          </span>
        );
      })}
    </code>
  );
};
