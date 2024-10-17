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

        // Returns the node as JSX, including an <span> for the current position
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
