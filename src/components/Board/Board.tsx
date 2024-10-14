import styles from "./Board.module.css";
import { cellType } from "../../utils/types";

export default function Board({ board }: { board: cellType[][] }) {
  return (
    <div className={styles.gameBoard}>
      {board.map((row: cellType[], rowIndex: number) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell: cellType, colIndex: number) => (
            <div key={colIndex} className={`${styles.cell} ${styles[cell]}`}>
              {cell !== "empty" && cell !== "wall" && (
                <img src={`src/assets/${cell}.svg`} alt={cell} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
