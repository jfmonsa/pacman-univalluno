import { positionType, TreeNode } from "../utils/types";
import { posToString } from "./posToString";

/** Handle tree construction for algo visualization */
abstract class TreeBuilderBase {
  protected tree: TreeNode;
  protected nodeCount: number;

  constructor(start: positionType) {
    this.tree = { data: { v: posToString(start) }, children: [] };
    this.nodeCount = 1;
  }

  abstract addNode(parentNodeData: any, newNodeData: any): TreeNode | void;

  getTree(): TreeNode {
    return this.tree;
  }

  getNodeCount(): number {
    return this.nodeCount;
  }
}

/**  Handle tree construction for Recursive algos: e.g dfs() */
export class TreeBuilderRecursive extends TreeBuilderBase {
  constructor(start: positionType) {
    super(start);
  }

  addNode(parentNode: TreeNode | null, newNodeData: string): TreeNode {
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
}

/** Hangle tree construction for iterative algos: e.g bfs() aStar() */
export class TreeBuilderIterative extends TreeBuilderBase {
  private nodeMap: Map<string, TreeNode>;

  constructor(start: positionType) {
    super(start);
    // Map to store the nodes
    // Initialize map with the root node
    this.nodeMap = new Map([[posToString(start), this.tree]]);
  }

  addNode(parentNodeData: positionType, newNodeData: positionType): void {
    const parentNode = this.nodeMap.get(posToString(parentNodeData));

    if (!parentNode) {
      throw new Error("Parent node not found in the map");
    }

    const childNode: TreeNode = {
      data: { v: posToString(newNodeData) },
      children: [],
    };

    parentNode.children!.push({ node: childNode });
    this.nodeMap.set(posToString(newNodeData), childNode);
    this.nodeCount++;
  }
}
