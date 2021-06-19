import Path from '@/Path'
import { FlowType } from '@/dock/interfaces'
import { Pair } from '@/types'
import { pair } from '@/utils'
import ElementWrapper from './Element'
import Template from './Template'

export default class LinkElement extends ElementWrapper {
	static props = {
    	[FlowType.DATA]: { width: 3, stroke: '#4CAF50' },
    	[FlowType.EXE]:  { width: 4, stroke: '#3F51B5' },
  	}

	get position(): Pair<number> {
		return pair(0) //# should be ElementWrapper default implementation
	}

	/**
	 * Getter/Setter for `LinkElement#stroke` the color of the link.
	 */
	get stroke(): string {
		return this.container.style.stroke
	}

	set stroke(newStroke: string) {
		this.container.style.stroke = newStroke
	}

	/**
	 * Getter/Setter for `LinkElement#width`, the stroke size.
	 */
	get width(): string {
		return this.container.style.strokeWidth
	}

	set width(newWidth: string) {
		this.container.style.strokeWidth = newWidth
	}

	/**
	 * Getter/Setter for `LinkElement#path`, the path definition of the SVG element.
	 */
	get path(): string {
		return this.container.getAttribute('d') || ''
	}

	set path(newPath: string) {
		this.container.setAttribute('d', newPath)
	}

  	constructor(parent: Element, type: FlowType) {
    	super()
		this.create()
    	parent.appendChild(this.container)
		Object.assign(this, LinkElement.props[type])
	}

	/**
	 * @overrides Element#create
	 */
	create(): void {
		const $ = Template.import('link')
		Object.assign(this, { container: $('path') })
	}

	/**
	 * Updates the link's svg representation.
	 */
	update([a, b]: [Pair<number>, Pair<number>]): void {
		this.path = Path.calculate(a, b)
	}
}