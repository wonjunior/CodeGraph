import { DockSide, FlowType } from '@/dock/interfaces'
import { Pair } from '@/types'
import { wait, zip } from '@/utils'
import CanvasZoom from './CanvasZoom'
import ElementWrapper from './Element'
import NodeElement from './NodeElement'
import Template from './Template'

export default class DockElement extends ElementWrapper {
	static params = {
		[FlowType.EXE]:  { offset: 10 },
		[FlowType.DATA]: {  offset: 7 },
	}

	public pin: Element
	public snap: Element
	public param: Element
	public label: Element
	public node: NodeElement
	public offset: Pair<number>

	get position(): Pair<number> {
		return zip(this.node.position, this.offset)
			.map(([nodePos, offset]) => nodePos + offset) as Pair<number>
	}

	get labelText() {
		return this.label.textContent
	}

	set labelText(label) {
		this.label.textContent = label
 	}

	constructor(public type: FlowType, public side: DockSide, label: string, public location: string) {
		super({ type, side })

		this.labelText = label
	}

	render(node: NodeElement, zoom: CanvasZoom) {
		node.getBodyPart(this.location, this.side).appendChild(this.container)
		this.node = node
		wait(() => this.initRelativePosition(zoom))
	}

	/**
	 * @overrides Element#create
	 */
	create({ type, side }: { type: FlowType, side: DockSide }) { //? we already know this!!!!!!!!!!
		const $ = Template.import('dock')

		Object.assign(this, {
			container: $('.dock-container'),
			pin: $('.dock'),
			snap: $('.snap-dock'),
			param: $('.param-container'),
			label: $('.param-label'),
		})

		this.container.classList.add(side, type)
	}

	initRelativePosition(zoom: CanvasZoom): void { //? can use Element#getBoundingClientRect directly
		const nodePos = this.node.container.getBoundingClientRect()
		const dockPos = this.pin.getBoundingClientRect()
		const offset = DockElement.params[this.type].offset

		this.offset = [
			(dockPos.x - nodePos.x) / zoom.level + offset,
			(dockPos.y - nodePos.y) / zoom.level + offset
		]
	}
}