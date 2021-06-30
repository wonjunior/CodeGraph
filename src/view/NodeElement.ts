import { assert, capitalize, pair } from '@/utils'
import Canvas from '@/Canvas'
import { Pair } from '@/types'
import { NodeParams } from '@/node/interfaces'
import ElementWrapper from './Element'
import DockElement from './DockElement'
import Template from './Template'

export default class NodeElement extends ElementWrapper {
	public canvas: Canvas
	public header: HTMLElement
	public label: HTMLElement
	public headLeft: HTMLElement
	public headRight: HTMLElement
	public bodyLeft: HTMLElement
	public bodyRight: HTMLElement
	public background: HTMLElement

	/**
	 * Getter/Setter for the node's header background color.
	 */
	get headerColor(): string {
		return this.header.style.background
	}

  	set headerColor(color: string) {
		this.header.style.background = color
	}

	/**
	 * Getter for the width and length of the node's container returned as an array.
	 */
	get size(): Pair<number> {
		const properties = this.container.getBoundingClientRect()
		return [ properties.width, properties.height ]
	}

	/**
	 * Setter which adds/removes the `selected` class name from the node's container.
	 */
	set highlight(bool: boolean) {
		this.container.classList[ bool ? 'add' : 'remove' ]('selected')
	}

	/**
	 * Getter/Setter which returns the x and y coordinates of the node's position on the canvas.
	 */
	get position(): Pair<number> {
		return [ this.container.style.left, this.container.style.top ].map(parseFloat) as Pair<number>
	}

  	set position(position: Pair<number>) {
		const [ x, y ] = this.boundaryClamp(position) //# this should be in Node and pass Node object as Placeable instead of Node#element...
    	Object.assign(this.container.style, { left: `${x}px`, top: `${y}px` })
  	}

	/**
	 * Getter/Setter for the text label on the node's header section.
	 */
	get labelText(): string {
		return this.label.textContent || ''
	}

	set labelText(label) {
		this.label.textContent = label
	}

	/**
	 * Getter/Setter for node's background text label.
	 */
	get backgroundText(): string {
		return this.label.textContent || ''
	}

	set backgroundText(background) {
		this.background.textContent = background
	}

	constructor(dockElements: Array<DockElement>, canvas: Canvas, params: NodeParams) {
		super()

		this.create()
		this.canvas = canvas
		this.render(dockElements)

		this.labelText = params.label
		this.backgroundText = params.background
		this.headerColor = params.header
		this.position = pair(...params.position || 0)

		// if (this.hideBody) this.hide('body') //? what is that
		// if (this.hideHeader) this.hide('header')
	}

	render(dockElements: DockElement[]) {
		this.canvas.element.nodeArea.appendChild(this.container)
		dockElements.forEach(dock => dock.render(this, this.canvas.zoom))
  	}

  	getBodyPart(location: string, side: string): Element {
		const part = location + capitalize(side)
		switch(part) {
			case 'headLeft': return this.headLeft
			case 'headRight': return this.headRight
			case 'bodyLeft': return this.bodyLeft
			case 'bodyRight': return this.bodyRight
			default: assert(false, `Node part "${part}" is not valid`)
		}

	}

	/**
	 * @overrides Element#create
	 */
	create(): void {
		const $ = Template.import('node')

		Object.assign(this, {
			container: $('.node-container'),
			header: $('.header'),
			label: $('.header-title'),
			headLeft: $('.header-block > .left-block'),
			headRight: $('.header-block > .right-block'),
			bodyLeft: $('.body > .left-block'),
			bodyRight: $('.body > .right-block'),
			background: $('.body > .background')
		})
	}

	/**
	 * Clamps the provided [x, y] position so the node container remains inside its parent canvas area.
	 */
	boundaryClamp(position: Pair<number>): Pair<number> {
		return position.map((value, i) => {
			const max = (this.canvas.element.size[i] - this.size[i]) / this.canvas.zoom.level
			return value <= 0 ? 0 : (value >= max ? max : value)
		}) as Pair<number> //# refactor this boi
	}

	/**
	 * Hides the corresponding node portion
	 * @param part is either `header` or `body`
	 */
	hide(part: string): void {
		this.container.classList.add(`hide-${part}`)
	}

	/**
	 * Toggles the `selected` class name on the node's container element.
	 * @returns the state of the node, i.e. if it is selected or not
	 */
	toggleHighlight(): boolean {
		return this.container.classList.toggle('selected') //? is it this.container?
	}
}