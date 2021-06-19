import { Pair } from '@/types'
import { zip } from '@/utils'
import ElementWrapper from './Element'
import Template from './Template'

export default class CanvasElement extends ElementWrapper {
	public zoomWrapper: HTMLElement
	public positionWrapper: HTMLElement
	public nodeArea: HTMLElement
	public linkArea: HTMLElement

	static closestCanvas(element: Element): HTMLElement | null {
		return element.closest('.objects')
	}

	get parentSize(): Pair<number> {
		return this.getBoundingClientRect(this.container, 'size')
	}

	get size(): Pair<number> {
		return this.getBoundingClientRect(this.positionWrapper, 'size')
	}

	get parentOffset(): Pair<number> {
		return this.getBoundingClientRect(this.container, 'position')
	}

	get offset(): Pair<number>  {
		return this.getBoundingClientRect(this.positionWrapper, 'position')
	}

	get position(): Pair<number> {
		return [ this.positionWrapper.style.left, this.positionWrapper.style.top ]
			.map(parseFloat) as Pair<number>
  	}

	set position([ x, y ]: Pair<number>) {
		Object.assign(this.positionWrapper.style, { left: `${x}px`, top: `${y}px` })
	}

	constructor(parent: Element) {
		super()
		this.create()
		parent.appendChild(this.container)
    	// this.render(parent) //? can this be called from super?
  	}

  	getProperties(): Array<[number, number, number, number, number]> {
		return zip(this.position, this.offset, this.parentOffset, this.size, this.parentSize)
	}

	/**
	 * @overrides Element#create
	 */
  	create(): void { //? rename to setup
		const $ = Template.import('canvas')

		Object.assign(this, {
			container: $('.canvas-wrapper'),
			zoomWrapper: $('.canvas'),
			positionWrapper: $('.objects'),
			nodeArea: $('.nodes'),
			linkArea: $('.links > svg'),
		})
  	}
}