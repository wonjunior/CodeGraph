import { Pair } from '@/types'
import { clamp, zip } from '@/utils'
import CanvasElement from '@/view/CanvasElement'
import CanvasZoom from '@/view/CanvasZoom'

export default class Canvas {
	public element: CanvasElement
	public zoom: CanvasZoom

	set position(position: Pair<number>) {
		this.element.position = this.boundaryClamp(position)
	}

	constructor(parent: HTMLElement) {
		this.element = new CanvasElement(parent)
    	this.zoom = new CanvasZoom(this, this.element.zoomWrapper)
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
}