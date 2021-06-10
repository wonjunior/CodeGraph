import Dock from '@/dock/Dock'
import Graph from '@/Graph'
import Link from '@/Link'
import { assert } from '@/utils'
import EventHandler from './controller/EventHandler'
import { EventType } from './controller/state/interfaces'
import Socket from './dock/Socket'
import { GraphInputEvent, HandlerParams } from './GraphEventHandler'

/**
 * Handles the dragging behavior of links in UI. When a user is interacting with a link a new
 * instance  is created and takes care of initiating and closing mouse events.
 */
export default class Linkable {
	/**
	 * The dock the link is snapped to, i.e. not the dock the link originates from.
	 */
	private snapped: Dock | null = null
	private link: Link
	private eventHandler: EventHandler<GraphInputEvent>

	/**
	 * Creates a new event handler for the linking behavior and initiates the mouse event listeners.
	 */
	constructor(event: MouseEvent, start: Socket, public graph: Graph, { receiver, resolver }: HandlerParams) { //# rename eventHandler
		this.link = Link.get(start, graph)

		this.mouseMove(event)
		this.eventHandler = new EventHandler<GraphInputEvent>({
			mousemove: { callback: this.mouseMove },
			mouseup: { callback: this.mouseUp, once: true },
		}, receiver, resolver)
	}

	/**
	 * {Event callback} Executed when mouse moves.
	 */
	private mouseMove = (event: MouseEvent) => {
		this.insideSnapArea(event) ? this.mouseIn(event) : this.mouseOut(event)
	}

	/**
	 * {Event callback} Executed when mouse button gets released.
	 */
	private mouseUp = (): void => {
		this.snapped ? this.mouseUpIn() : this.mouseUpOut()
		this.eventHandler.removeEventListener(EventType.MOUSEMOVE)
	}

	/**
	 * {Event callback} Executed when mouse is moving inside a snap area.
	 */
	private mouseIn(event: MouseEvent): void {
		if (!this.snapped) this.mouseEnter(event)
	}

	/**
	 * {Event callback} Executed when mouse is moving outside a snap area.
	 */
	private mouseOut(event: MouseEvent): void {
		if (this.snapped) this.mouseLeave(event)
		this.trackMouse(event)
	}

	/**
	 * {Event callback} Executed when mouse is entering a snap area.
	 */
	private mouseEnter(event: MouseEvent): void {
		// const dock = this.graph.get(event.target)
		// this.canSnap(dock) ? this.snap(dock) : this.trackMouse(event)
	}

	/**
	 * {Event callback} Executed when mouse is leaving a snap area.
	 */
	private mouseLeave(_: MouseEvent): void {
		this.snapped = null
	}

	/**
	 * {Event callback} Executed when mouse is released and link is snapped.
	 */
	private mouseUpIn(): void {
		this.link.pin(<Socket> this.snapped)
	}

	/**
	 * {Event callback} Executed when mouse up is released outside of a snap area.
	 */
	private mouseUpOut(): void {
		this.link.destroy()
	}

	/**
	 * Returns true if the mouse is located on a snap area.
	 */
	private insideSnapArea({ target }: MouseEvent): boolean {
		return (<Element> target).matches('.snap-dock')
	}

	/**
	 * Updates the position of the link's end dock with the mouse's position.
	 */
	private trackMouse(event: MouseEvent): void {
		this.link.update(this.graph.canvas.mousePosition(event))
	}

	/**
	 * Returns whether the link can snap on the given dock or not.
	 * @param dock against which we're testing the link's compatibility
	 */
	private canSnap(dock: Dock): boolean {
		return this.link.isCompatible(dock)
	}

	/**
	 * Snaps the link to the dock given as argument.
	 */
	private snap(dock: Dock): void {
		this.snapped = dock
		this.link.update(dock.element.position)
	}
}