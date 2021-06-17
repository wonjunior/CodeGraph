import Canvas from '@/Canvas'
import Component from '@/Component'
import GraphObjectStore from '@/GraphObjectStore'
import Node from '@/node/Node'
import { GraphEventHandler, GraphInputEvent } from './GraphEventHandler'
import { GraphObject } from './GraphObject'
import Link from './Link'


export default class Graph {
	// private static all = new WeakMap<HTMLElement, Graph>()

	private nodes = new Set<Node>()
	public canvas: Canvas
	private store = new GraphObjectStore()
	// public graphEventHandler = new GraphEventHandler()

	// public static get(key: HTMLElement): Graph {
	// 	const canvas = CanvasElement.closestCanvas(key)
	// 	if (canvas == null) throw new Error(`could not find canvas: ${key}`)

	// 	// return <Graph>Graph.all.get(key) || Graph.all.get(canvas) //? for now cast
	// }

	private resolver = (target?: EventTarget | null | undefined): GraphInputEvent => {
		return {
			graph: this,
			object: this.store.get(<HTMLElement> target),
			eventHandler: {
				receiver: this.eventReceiver,
				resolver: this.resolver,
			}
		}
	}

	private get eventReceiver(): HTMLElement {
		return this.canvas.element.container
	}

	constructor(parent: HTMLElement) {
		this.canvas = new Canvas(parent)
		this.store.bind(this.canvas.binds[0])
		new GraphEventHandler(this, this.store)
	}

	add(component: Component): Node {
		const node = component.instanciate(this)
		node.binds.forEach(this.store.bind)
		return this.register(node)
	}

	addLink(link: Link): void {
		this.store.bind(link.binds[0])
	}

	removeLink(link: Link): void {
		link.binds.forEach(([key, _]) => this.store.unbind(key))
	}

	unregister(node: Node): boolean {
		return this.nodes.delete(node)
	}

	private register(node: Node): Node {
		return this.nodes.add(node) && node
	}
}