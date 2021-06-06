import Canvas from '@/Canvas'
import Component from '@/Component'
import Dock from '@/dock/Dock'
import ObjectElementMap from '@/GraphObjectStore'
import GraphEventHandler from '@/interpreter/GraphEventHandler'
import Node from '@/node/Node'
import CanvasElement from '@/view/CanvasElement'
import KeyEventHandler from './controller/KeyEventHandler'
import { EditorDefaultState } from './controller/state/EditorState'
import Editor from './Editor'

export default class Graph {
	// private static all = new WeakMap<HTMLElement, Graph>()

	private nodes = new Set<Node>()
	public canvas: Canvas
	public store = new ObjectElementMap()
	public eventHandler = new GraphEventHandler()

	// public static get(key: HTMLElement): Graph {
	// 	const canvas = CanvasElement.closestCanvas(key)
	// 	if (canvas == null) throw new Error(`could not find canvas: ${key}`)

	// 	// return <Graph>Graph.all.get(key) || Graph.all.get(canvas) //? for now cast
	// }

	public get(target: EventTarget | null): Dock {
		if (!target) throw new Error('target null')
		return this.store.get(<HTMLElement>target) as Dock //? store is used nowhere
	}

	constructor(canvasParent: HTMLElement) {
		this.canvas = new Canvas(canvasParent)
		// Graph.all.set(this.canvas.element.positionWrapper, this)

		this.canvas.element.container.addEventListener('keyup', event => {
			console.log(event)
			new KeyEventHandler(event, EditorDefaultState)
			//? instanciate then call and return should tell if something was triggered
		})

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