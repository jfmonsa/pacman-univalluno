import "./AlgoVisualization.css";
import { BeautifulTree } from "@beautiful-tree/react";
import { positionType, TreeNode } from "../../utils/types";
import { FormattedPath } from "./FormattedPath";

// helpers
const getNodeContent = (node: any) => {
  return node.v || "Node";
};

interface AlogVisualizationProps {
  kermitTree: TreeNode | null;
  kermitNnodes: number;
  kermitPath: positionType[];
  kermitAlgoTime: number;
  kermitPosition: positionType;
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
  piggyTree,
  piggyNnodes,
  piggyPath,
  piggyStrategy,
  piggyAlgoTime,
  piggyPosition,
}: AlogVisualizationProps) {
  return (
    <div>
      <h2>Algo Visualization</h2>
      <h3>Kermit a Elmo</h3>
      <ul>
        <li>Algoritmo: DFS Limitado</li>
        <li>Nodos: {kermitNnodes}</li>
        <li>Tiempo: {kermitAlgoTime} ms </li>
      </ul>
      <h4>Camino</h4>
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

      <h3>Piggy a Kermit</h3>
      <ul>
        <li>Algoritmo: {piggyStrategy}</li>
        <li>Nodos: {piggyNnodes}</li>
        <li>Tiempo: {piggyAlgoTime} ms </li>
      </ul>
      <h4>Camino</h4>
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
