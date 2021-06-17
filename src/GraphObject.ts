
export abstract class GraphObject {
	public abstract get binds(): Array<GraphObjectItem>
}

export type GraphObjectItem = [HTMLElement, GraphObject]