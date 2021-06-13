
export abstract class GraphObject {
	public abstract get binds(): Array<GraphObjectBind>
}

export type GraphObjectBind = [HTMLElement, GraphObject]