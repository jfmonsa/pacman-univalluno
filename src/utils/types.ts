export type cellType =
  | "empty"
  | "wall"
  | "cookie"
  | "kermit"
  | "elmo"
  | "piggy";

export type positionType = { row: number; col: number };

// For tree structure
/*
  Structure for tree to use @beautiful-tree/react

  data: { v: 'A' },
	children: [
		{
			node: {
				data: { v: 'B' },
			children: [
*/

export interface TreeNode {
  data: { [key: string]: unknown }; // 'data' property can contain any key-value pair
  children?: TreeChild[]; // 'children' is optional since leaf nodes won't have children
}

interface TreeChild {
  eData?: { [key: string]: unknown }; // Optional property to store edge data
  node: TreeNode; // Each children has a node that follows the TreeNode structure
}
