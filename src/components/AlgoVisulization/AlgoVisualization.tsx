import { BeautifulTree } from "@beautiful-tree/react";

// kermit results
const treeKermitToElmo = JSON.parse(
  localStorage.getItem("treeKermitToElmo") as string
);

const pathKermitToElmo = localStorage.getItem("pathKermitToElmo");

// helpers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNodeContent = (node: any) => {
  console.log(node.v);
  return node.v || "Node";
};

export default function AlgoVisualization() {
  return (
    <div>
      <h2>Kermit a Elmo</h2>
      <h3>Arbol</h3>
      {treeKermitToElmo && JSON.stringify(treeKermitToElmo) && (
        <BeautifulTree
          id={"my-tree"}
          tree={treeKermitToElmo}
          svgProps={{
            width: 1000,
            height: 1000,
            sizeUnit: "px",
          }}
          getNodeContent={getNodeContent}
        />
      )}
      <h3>Camino</h3>
      {pathKermitToElmo && <div>{pathKermitToElmo}</div>}
    </div>
  );
}
