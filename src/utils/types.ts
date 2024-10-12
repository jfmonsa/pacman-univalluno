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
  data: { [key: string]: unknown }; // Propiedad 'data' puede contener cualquier clave y valor
  children?: TreeChild[]; // 'children' es opcional, ya que puede haber nodos sin hijos
}

interface TreeChild {
  eData?: { [key: string]: unknown }; // Propiedad opcional 'eData' para anotaciones en los enlaces
  node: TreeNode; // Cada hijo contiene un nodo que sigue la estructura de TreeNode
}
