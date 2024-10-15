import styles from "./Controls.module.css";

interface ControlsProps {
  isSimulating: boolean;
  handleSimulation: () => void;
  avoidingLoopsDFS: boolean;
  setAvoidingLoopsDFS: (value: boolean) => void;
  rows: number;
  setRows: (value: number) => void;
  cols: number;
  setCols: (value: number) => void;
  handleResetBoard: () => void;
}

// aux components
const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default function Controls({
  isSimulating,
  handleSimulation,
  avoidingLoopsDFS,
  setAvoidingLoopsDFS,
  rows,
  setRows,
  cols,
  setCols,
  handleResetBoard,
}: ControlsProps) {
  return (
    <>
      <label>
        Evitar ciclos para DFS?
        <input
          type="checkbox"
          checked={avoidingLoopsDFS}
          onChange={(e) => setAvoidingLoopsDFS(e.target.checked)}
        />
      </label>
      <div>
        <label>Ancho del tablero: {cols}</label>
        <input
          type="range"
          min="4"
          max="20"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Alto del tablero: {rows}</label>
        <input
          type="range"
          min="4"
          max="20"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>
      <Button onClick={handleSimulation}>
        {isSimulating ? "Pause Simulation" : "Start Simulation"}
      </Button>
      <Button onClick={handleResetBoard}>Regenerar Tablero</Button>
    </>
  );
}
