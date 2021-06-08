import Canvas from '@/Canvas'
import Component from '@/Component'
import Dock from '@/dock/Dock'
import GraphObjectStore from '@/GraphObjectStore'
import GraphEventHandler from '@/interpreter/GraphEventHandler'
import Node from '@/node/Node'
import CanvasElement from '@/view/CanvasElement'
import EventHandler from './controller/EventHandler'
import KeyEventHandler from './controller/KeyEventHandler'
import { MouseEventHandler } from './controller/MouseEventHandler'
import { EditorDefaultState } from './controller/state/EditorState'
import { MousePosition } from './Draggable'
import Editor from './Editor'
import GraphObject from './GraphObject'
import { assert } from './utils'

interface UserInputPayload {
	graph: Graph,
	object: GraphObject | null
}

export default class Graph {
	// private static all = new WeakMap<HTMLElement, Graph>()

	private nodes = new Set<Node>()
	public canvas: Canvas
	public store = new GraphObjectStore()
	private eventHandler: EventHandler<UserInputPayload>
	// public graphEventHandler = new GraphEventHandler()

	// public static get(key: HTMLElement): Graph {
	// 	const canvas = CanvasElement.closestCanvas(key)
	// 	if (canvas == null) throw new Error(`could not find canvas: ${key}`)

	// 	// return <Graph>Graph.all.get(key) || Graph.all.get(canvas) //? for now cast
	// }

	private resolver = (target?: EventTarget | null | undefined): UserInputPayload => {
		return { graph: this, object: this.store.get(<HTMLElement>target) }
	}

	private get eventReceiver(): HTMLElement {
		return this.canvas.element.container
	}

	constructor(parent: HTMLElement) {
		this.canvas = new Canvas(parent)
		this.eventHandler = new EventHandler(EditorDefaultState, this.eventReceiver, this.resolver)
	}

	add(component: Component): Node {
		return this.register(component.instanciate(this))
	}

	unregister(node: Node): boolean {
		return this.nodes.delete(node)
	}

	private register(node: Node): Node {
		return this.nodes.add(node) && node
	}
}