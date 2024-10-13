import styles from "./Controls.module.css";

interface ControlsProps {
  isSimulating: boolean;
  handleSimulation: () => void;
  avoidingLoopsDFS: boolean;
  setAvoidingLoopsDFS: (value: boolean) => void;
}

export default function Controls({
  isSimulating,
  handleSimulation,
  avoidingLoopsDFS,
  setAvoidingLoopsDFS,
}: ControlsProps) {
  return (
    <>
      {/* <label>Test</label> */}
      {/* <input type="range" min="2" max="10"></input> */}
      <button className={styles.button} onClick={handleSimulation}>
        {isSimulating ? "Stop Simulation" : "Start Simulation"}
      </button>
      <label>
        Evitar ciclos para dfs?
        <input
          type="checkbox"
          checked={avoidingLoopsDFS}
          onChange={(e) => {
            setAvoidingLoopsDFS(e.target.checked);
          }}
        />
      </label>
    </>
  );
}
