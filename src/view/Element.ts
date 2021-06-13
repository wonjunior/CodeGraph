import { Pair } from '@/types'
import { assert } from '@/utils'

export default abstract class ElementWrapper {
	public container: HTMLElement

	abstract create(args?: {[k: string]: string}): void
	abstract get position(): Pair<number>
	abstract set position(position: Pair<number>)

	constructor(args?: {[k: string]: string}) {
		this.create(args) //# this is very useless indeed, yes?
 	}

	// render(parent: Element) { //? do we really need this?
	// 	parent.appendChild(this.container)
	// }

	remove() {
		this.container.remove()
	}

	getBoundingClientRect(element: Element, property: string): Pair<number> { //# rename shorter
		const { width, height, x, y } = element.getBoundingClientRect()

		switch (property) { //# use enum please
			case 'size': return [ width, height ]
			case 'position': return [ x, y ]
			default: assert(false, `property "${property}" not supported`)
		}
	}
}