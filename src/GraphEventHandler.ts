import EventHandler from './controller/EventHandler'
import { EditorDefaultState } from './controller/state/EditorState'
import Graph from './Graph'
import GraphObject from './GraphObject'
import GraphObjectStore from './GraphObjectStore'

export interface GraphInputEvent {
	graph: Graph
	object: GraphObject | null
	eventHandler: HandlerParams
}

export interface HandlerParams { //# rename this kind of EventHandler...
	receiver: HTMLElement
	resolver: (target?: Element | null | undefined) => GraphInputEvent
}

export class GraphEventHandler {
	constructor(private graph: Graph, private store: GraphObjectStore) {
		new EventHandler(EditorDefaultState, this.receiver, this.resolver)
	}

	resolver = (target?: EventTarget | null | undefined): GraphInputEvent => {
		return {
			graph: this.graph,
			object: this.store.get(<HTMLElement> target),
			eventHandler: this
		}
	}

	get receiver(): HTMLElement {
		return this.graph.canvas.element.container
	}
}