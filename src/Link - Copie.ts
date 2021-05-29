import Graph from '@/Graph'
import GraphObject from '@/GraphObject'
import { DockSide, InDock, FlowType } from '@/dock/interfaces'
import UniqueSocket from '@/dock/UniqueSocket'
import Dock from '@/dock/Dock'
import LinkElement from '@/view/LinkElement'
import { TriggerArgs } from '@/interpreter/interfaces'
import { Pair } from '@/types'
import { assert } from '@/utils'

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
export default class Link extends GraphObject {
	static get(start: Dock, graph: Graph): Link {
		if (start instanceof UniqueSocket && start.occupied) return start.editLink()
		return new Link(start, null, graph)
	}

	public element: LinkElement
	public start: Dock
	public end?: Dock
	// public tmp?: Dock
	// public start?: OutDock
	// public end?: InDock

	get type(): FlowType {
		return this.start.type
	}

	get origin(): Dock {
		return this.start
	}

    /**
	 * Adds a new link object to the Canvas or edit a link if already exists
	 * @param start the dock from which the link has been pulled
	 * @param end a dock instance if second dock is known
	 */
	constructor(start: Dock, end: UniqueSocket | null, public graph: Graph) {
		super()

		this.element = new LinkElement(graph.canvas.element.linkArea, start.type)
    	this.start.addLink(this)
    	if (end) this.setEndDock(end)
  	}

	isCompatible(dock: Dock) {
		return this.start.isCompatible(dock)
	}

	/**
	 * Check if end is compatible with link then save the link on the dock.
	 */
	setEndDock(end: UniqueSocket) {
		if (!this.isCompatible(end)) this.destroy()
		this.pin(end)
		this.update()
	}

	/**
	 * Adds the link to the endDock's links, swapping docks if necessary
	 */
	pin(end: Dock) {
		this.end = end
		this.end.popExisting().addLink(this)
		if (this.end.side == DockSide.RIGHT) this.swapDocks()
		this.graph.eventHandler.handle(this)
	}

	/**
	 * Remove the link from its endDock's links
	 * @returns the link that is edited
	 */
	unpin() {
		assert(this.end)
		this.end.dropLink(this)
		delete this.end
		return this
	}

	swapDocks() {
		[ this.start, this.end ] = [ <Dock>this.end, this.start ]
	}

	update(position: Pair<number> | undefined = this.end && this.end.element.position) {
		assert(position)
		const [a, b] = [this.start.element.position, position]
		return this.element.update(this.start.side == DockSide.RIGHT ? [a, b] : [b, a])
	}

	/**
	 * Unregisters the link, deletes the HTML object and unpins from start and end docks.
	 */
	destroy() {
		this.element.remove()
		this.start.dropLink(this)
		if (this.end) this.end.dropLink(this)
	}

	trigger(payload: TriggerArgs | void) { //? to avoid this we need to make this.end typed as "InDock"
		(<InDock> this.end).trigger(payload)
	}
}