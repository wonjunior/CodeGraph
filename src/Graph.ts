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
	// public graphEventHandler = new GraphEventHandler()

	private eventHandler: EventHandler<UserInputPayload>

	// public static get(key: HTMLElement): Graph {
	// 	const canvas = CanvasElement.closestCanvas(key)
	// 	if (canvas == null) throw new Error(`could not find canvas: ${key}`)

	// 	// return <Graph>Graph.all.get(key) || Graph.all.get(canvas) //? for now cast
	// }

	public resolver(target: EventTarget | null): UserInputPayload {
		assert(target)
		return { graph: this, object: this.store.get(<HTMLElement>target) }
	}

	constructor(canvasParent: HTMLElement) {
		this.canvas = new Canvas(canvasParent)
		// Graph.all.set(this.canvas.element.positionWrapper, this)

		this.eventHandler = new EventHandler(EditorDefaultState, this.canvas.element.container, this.resolver.bind(this))

		// this.keyEventHandler = new KeyEventHandler(EditorDefaultState.keybinds, Editor)
		// this.mouseEventHandler = new MouseEventHandler(EditorDefaultState.mousebinds)

		// this.canvas.element.container.addEventListener('keyup', event => {
		// 	console.log(event)
		// 	this.keyEventHandler.call(event)
		// })

		// document.addEventListener('mousedown', event => {
		// 	new MouseEventHandler(event, StateManager.current)
		// })
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