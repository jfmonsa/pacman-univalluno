import { TreeNode } from "../utils/types";

/**  Class to handle the tree construction for the algorithm visualization*/
export class TreeBuilder {
  private tree: TreeNode;
  private nodeCount: number;

  constructor(start: string) {
    this.tree = { data: { v: start }, children: [] };
    this.nodeCount = 1;
  }

  addNode(parentNode: TreeNode | null, newNodeData: string): TreeNode | null {
    const newNode = { data: { v: newNodeData }, children: [] };

    if (parentNode === null) {
      // If we are dealing with the root node
      this.tree.children!.push({ node: newNode });
    } else {
      parentNode!.children!.push({ node: newNode });
    }

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
