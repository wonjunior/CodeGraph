import GraphObject from '@/GraphObject'
import { assert } from '@/utils'
import KeyEventHandler from './KeyEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import { State } from './state/interfaces'

export default class EventHandler<T> {
	private keyEventHandler?: KeyEventHandler
	private mouseEventHandler?: MouseEventHandler

	constructor(state: State, element: HTMLElement, resolver: (target: Element | null) => T) {
		if ('keybinds' in state) {
			this.keyEventHandler = new KeyEventHandler(state.keybinds)
			element.addEventListener('keyup', event => {
				this.keyEventHandler!.call(event)
			})
		}

		if ('mousebinds' in state) {
			this.mouseEventHandler = new MouseEventHandler(state.mousebinds)
			element.addEventListener('mousedown', event => {
				// resolver should not be applied on event.target but on the match returned by the
				// eventHanlder which can bubble up, which ultimately ends up with a  different target
				const match = this.mouseEventHandler!.call(event)
				if (match) match.callback(event, resolver(match.target))
			})
		}

		//this.canvas.element.container.addEventListener('keyup', event => {
			// 	console.log(event)
			// 	this.keyEventHandler.call(event)
			// })

			// document.addEventListener('mousedown', event => {
			// 	new MouseEventHandler(event, StateManager.current)
			// })
	}
}