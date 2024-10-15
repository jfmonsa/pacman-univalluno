import { BeautifulTree } from "@beautiful-tree/react";
import { positionType, TreeNode } from "../../utils/types";

// helpers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNodeContent = (node: any) => {
  return node.v || "Node";
};

interface AlogVisualizationProps {
  kermitTree: TreeNode | null;
  kermitPath: positionType[] | null;
  piggyTree: TreeNode | null;
  piggyPath: positionType[] | null;
  piggyStrategy: string;
}

export default function AlgoVisualization({
  kermitTree,
  kermitPath,
  piggyTree,
  piggyPath,
  piggyStrategy,
}: AlogVisualizationProps) {
  return (
    <div>
      <h2>Kermit a Elmo</h2>
      <h3>Arbol</h3>
      {kermitTree && (
        <BeautifulTree
          id={"my-tree"}
          tree={kermitTree}
          svgProps={{
            width: 1000,
            height: 1000,
            sizeUnit: "px",
          }}
          getNodeContent={getNodeContent}
        />
      )}
      <h3>Camino</h3>
      {kermitPath && <div>{JSON.stringify(kermitPath)}</div>}

      <h2>Piggy a Kermit: {piggyStrategy}</h2>
      <h3>Arbol</h3>
      {piggyTree && (
        <BeautifulTree
          id={"piggy-tree"}
          tree={piggyTree}
          svgProps={{
            width: 1000,
            height: 1000,
            sizeUnit: "px",
          }}
          getNodeContent={getNodeContent}
        />
      )}
      <h3>Camino</h3>
      {piggyPath && <div>{JSON.stringify(piggyPath)}</div>}
    </div>
  );
}
