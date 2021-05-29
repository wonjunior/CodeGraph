import Canvas from '@/Canvas'

export default class CanvasZoom {
	public FACTOR = -0.05

	get level(): number {
		const scaleFromStyle = this.element.style.transform.replace(/[^\d.]/g, '')
		return parseFloat(scaleFromStyle) || 1
	}

	set level(scale: number) {
		this.element.style.transform = `scale(${scale})`
	}

	constructor(private canvas: Canvas, private element: HTMLElement) {}

	update(direction: number): void {
		const scale = this.level + this.FACTOR * direction
    	if (0.5 <= scale && scale <= 2) this.zoom(scale)
	}

	zoom(scale: number): void {
		this.updateOrigin()
		this.level = scale
		this.canvas.recalculatePosition()
  	}

	updateOrigin(): void {
		this.element.style.transformOrigin = this.canvas.element.parentSize
			.map(value => value / 2 + 'px').join(' ')
	}
}