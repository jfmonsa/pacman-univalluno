import { TreeNode } from "../utils/types";

/**  Clase para manejar la construcción del árbol*/
export class TreeBuilder {
  private tree: TreeNode;
  private nodeCount: number;

  constructor(start: string) {
    this.tree = { data: { v: start }, children: [] };
    this.nodeCount = 1;
  }

  addNode(parentNode: TreeNode, newNodeData: string): TreeNode {
    const newNode: TreeNode = { data: { v: newNodeData }, children: [] };
    parentNode?.children!.push({ node: newNode });
    this.nodeCount++;
    return newNode;
  }

  getTree(): TreeNode {
    return this.tree;
  }

  getNodeCount(): number {
    return this.nodeCount;
  }
}
