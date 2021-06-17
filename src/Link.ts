import Graph from '@/Graph'
import { GraphObject, GraphObjectItem } from '@/GraphObject'
import { DockSide, InDock, FlowType } from '@/dock/interfaces'
import UniqueSocket from '@/dock/UniqueSocket'
import Dock from '@/dock/Dock'
import LinkElement from '@/view/LinkElement'
import { TriggerArgs } from '@/interpreter/interfaces'
import { Pair } from '@/types'
import { assert } from '@/utils'
import Socket from './dock/Socket'

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
export default class Link extends GraphObject {
	private element: LinkElement

	public get binds(): Array<GraphObjectItem> {
		return [[this.element.container, this]]
	}

	public static get(origin: Socket, graph: Graph): Link {
		if (origin instanceof UniqueSocket && origin.occupied) return origin.editLink()
		return new Link(origin, null, graph)
	}

	// public tmp?: Dock
	// public start?: OutDock
	// public end?: InDock

	public get type(): FlowType {
		return this.start.type
	}

	public get origin(): Dock {
		return this.start
	}

    /**
	 * Adds a new link object to the Canvas or edit a link if already exists
	 * @param start the dock from which the link has been pulled
	 * @param end a dock instance if second dock is known
	 */
	constructor(private start: Socket, private end: Socket | null, public graph: Graph) {
		super()

		this.element = new LinkElement(graph.canvas.element.linkArea, start.type)
    	this.start.addLink(this)
    	if (end) this.setEndDock(end)
  	}

	public isCompatible(dock: Dock): boolean {
		return this.start.isCompatible(dock)
	}

	/**
	 * Adds the link to the endDock's links, swapping docks if necessary
	 */
	public pin(end: Socket): void {
		this.end = end
		this.end.popExisting().addLink(this)
		if (this.end.side == DockSide.RIGHT) this.swapDocks()
		// this.graph.eventHandler.handle(this)
	}

	/**
	 * Remove the link from its endDock's links
	 * @returns the link that is edited
	 */
	public unpin(): Link {
		assert(this.end)
		this.end.dropLink(this)
		this.end = null
		return this
	}

	public update(position?: Pair<number>): void {
		const pos = (position || this.end && this.end.element.position) as Pair<number>
		const [a, b] = [this.start.element.position, pos]
		return this.element.update(this.start.side == DockSide.RIGHT ? [a, b] : [b, a])
	}

	/**
	 * Unregisters the link, deletes the HTML object and unpins from start and end docks.
	 */
	public destroy(): void {
		this.element.remove()
		this.start.dropLink(this)
		if (this.end) this.end.dropLink(this)
		this.graph.removeLink(this)
	}

	public trigger(payload?: TriggerArgs): void {
		(<InDock> this.end).trigger(payload)
	}

	/**
	 * Check if end is compatible with link then save the link on the dock.
	 */
	private setEndDock(end: Socket): void {
		if (!this.isCompatible(end)) this.destroy()
		this.pin(end)
		this.update()
	}

	private swapDocks(): void {
		[ this.start, this.end ] = [ <Socket>this.end, this.start ]
	}
}