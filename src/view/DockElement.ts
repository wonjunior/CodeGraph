import { DockSide, FlowType } from '@/dock/interfaces'
import { Pair } from '@/types'
import { normalize, pair, wait, zip } from '@/utils'
import CanvasZoom from './CanvasZoom'
import ElementWrapper from './Element'
import NodeElement from './NodeElement'
import Template from './Template'

export default class DockElement extends ElementWrapper {
	static params = {
		[FlowType.EXE]:  { offset: 7 },
		[FlowType.DATA]: {  offset: 7 },
	}

	public pin: Element
	public snap: Element
	public param: Element
	public label: Element
	private node: NodeElement
	public offset: Pair<number>

	get position(): Pair<number> {
		return zip(this.node.position, [], [], this.offset).map(normalize) as Pair<number>
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
		this.node = node
		node.getBodyPart(this.location, this.side).appendChild(this.container)
		wait(() => this.offset = this.computeOffset(zoom))
	}

	/**
	 * @overrides Element#create
	 */
	create({ type, side }: { type: FlowType, side: DockSide }) { //# if that's the constructor then put it in the constructor
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

	private computeOffset(zoom: CanvasZoom): Pair<number> { //? can use Element#getBoundingClientRect directly
		//# use this.node.getBoundingClientRect('container') and use minimized interface to NodeElement
		const nodePos = this.node.container.getBoundingClientRect()
		const dockPos = this.pin.getBoundingClientRect()
		const offset = DockElement.params[this.type].offset

		return zip([dockPos.x, dockPos.y], [nodePos.x, nodePos.y], pair(zoom.level), pair(offset))
			.map(normalize) as Pair<number>
	}
}