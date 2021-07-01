import { Pair } from '@/types'
import { assert, clamp, pair, zip } from '@/utils'
import CanvasElement from '@/view/CanvasElement'
import CanvasZoom from '@/view/CanvasZoom'
import { GraphObject, GraphObjectItem } from './GraphObject'

export default class Canvas extends GraphObject {
	public element: CanvasElement
	public zoom: CanvasZoom

	public get binds(): Array<GraphObjectItem> {
		return [[this.element.positionWrapper, this]]
	}

	set position(position: Pair<number>) {
		const pos = this.boundaryClamp(position)
		this.element.position = pos
		this.element.updateInfo(this.coordinates)
	}

	constructor(parent: HTMLElement) {
		super()
		this.element = new CanvasElement(parent)
		this.zoom = new CanvasZoom(this, this.element.zoomWrapper)
		this.position = pair(0)
		// const x = this.element.getProperties()
		// const pos = [-x[0][3]/2, -x[1][3]/2] as Pair<number>
		// this.position = pos
	}

	recalculatePosition(): void { //? update position
		this.position = this.element.position
	}

	mousePosition(event: MouseEvent): Pair<number> {
		const [ x, y ] = [ event.clientX, event.clientY ]
		const [ offsetX, offsetY ] = this.element.offset
		return [ (x - offsetX) / this.zoom.level, (y - offsetY) / this.zoom.level ]
	}

	getLimitValues(): Pair<Pair<number>> {
		return this.element.getProperties().map(([pos, offset, parentOffset, size, parentSize]) => {
			const maxValue = (parentOffset - offset) / this.zoom.level + pos
			const minValue = maxValue + (parentSize - size) / this.zoom.level
			return [ minValue, maxValue ]
		}) as Pair<Pair<number>>
	}

	boundaryClamp(position: Pair<number>): Pair<number> {
		return zip(position, this.getLimitValues())
			.map(([value, limits]) => clamp(value, ...limits)) as Pair<number>
	}

	private get coordinates(): Pair<number> {
		return this.element.getProperties().map(([_0, offset, parentOffset, _3, _4]) => {
			return (parentOffset - offset) / this.zoom.level
		}) as Pair<number>
	}
}