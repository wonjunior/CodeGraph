import Dock from '@/dock/Dock'
import Graph from '@/Graph'
import Link from '@/Link'
import { assert } from '@/utils'
import Socket from './dock/Socket'

/**
 * Handles the dragging behavior of links in UI. When a user is interacting with a link a new
 * instance  is created and takes care of initiating and closing mouse events.
 */
export default class Linkable {
	public link: Link
	/**
	 * {Dock} the dock on which the link is snapped
	 */
	private snapped: Dock | null = null

	/**
	 * Creates a new event handler for the linking behavior and initiates the mouse event listeners.
	 * @param event the event that triggered Linkable
	 * @param start the dock from which the event is initiated
	 * @param graph
	 */
	constructor(event: MouseEvent, start: Dock, public graph: Graph) {
		this.link = Link.get(<Socket> start, graph)

		this.mouseMove(event)
		document.addEventListener('mousemove', this.mouseMove)
		document.addEventListener('mouseup', this.mouseUp, { once: true })
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
		document.removeEventListener('mousemove', this.mouseMove)
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
	private mouseEnter(event: MouseEvent, dock = this.graph.get(event.target)): void {
		this.canSnap(dock) ? this.snap(dock) : this.trackMouse(event)
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