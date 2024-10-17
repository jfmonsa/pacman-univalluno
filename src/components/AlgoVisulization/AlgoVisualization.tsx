import "./AlgoVisualization.css";
import { BeautifulTree } from "@beautiful-tree/react";
import { positionType, TreeNode } from "../../utils/types";
import { FormattedPath } from "./FormattedPath";

// Helpers
const getNodeContent = (node: any) => {
  return node.v || "Node";
};

interface AlogVisualizationProps {
  kermitTree: TreeNode | null;
  kermitNnodes: number;
  kermitPath: positionType[];
  kermitAlgoTime: number;
  kermitPosition: positionType;
  kermitStrategy: string;
  piggyTree: TreeNode | null;
  piggyNnodes: number;
  piggyPath: positionType[];
  piggyStrategy: string;
  piggyAlgoTime: number;
  piggyPosition: positionType;
}

export default function AlgoVisualization({
  kermitTree,
  kermitNnodes,
  kermitPath,
  kermitAlgoTime,
  kermitPosition,
  kermitStrategy,
  piggyTree,
  piggyNnodes,
  piggyPath,
  piggyStrategy,
  piggyAlgoTime,
  piggyPosition,
}: AlogVisualizationProps) {
  return (
    <div>
      <h2>Visualization: Kermit a Elmo</h2>
      <ul>
        <li>Algoritmo: {kermitStrategy}</li>
        <li>Nodos: {kermitNnodes}</li>
        <li>Tiempo de computación: {kermitAlgoTime} ms </li>
      </ul>
      <h3>Camino</h3>
      {kermitPath && (
        <FormattedPath path={kermitPath} currentPosition={kermitPosition} />
      )}
      <h4>Árbol</h4>
      {kermitTree && (
        <BeautifulTree
          id={"my-tree"}
          tree={kermitTree}
          svgProps={{
            width: 1000,
            height: 1000,
            sizeUnit: "px",
          }}
          getNodeContent={(node: any) => {
            kermitNnodes++;
            return getNodeContent(node);
          }}
        />
      )}

      <h2>Visualization: Piggy a Kermit</h2>
      <ul>
        <li>Algoritmo: {piggyStrategy}</li>
        <li>Nodos: {piggyNnodes}</li>
        <li>Tiempo de computación: {piggyAlgoTime} ms </li>
      </ul>
      <h3>Camino</h3>
      {piggyPath && (
        <FormattedPath path={piggyPath} currentPosition={piggyPosition} />
      )}
      <h4>Árbol</h4>
      {piggyTree && (
        <BeautifulTree
          id={"piggy-tree"}
          tree={piggyTree}
          svgProps={{
            width: 1000,
            height: 1000,
            sizeUnit: "px",
          }}
          getNodeContent={(node: any) => {
            piggyNnodes++;
            return getNodeContent(node);
          }}
        />
      )}
    </div>
  );
}
