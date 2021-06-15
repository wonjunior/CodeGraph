import { assert } from '@/utils'
import KeyEventHandler from './KeyEventHandler'
import { MouseButton } from './MouseCode'
import { MouseEventHandler } from './MouseEventHandler'
import MouseWheelEventHandler from './MouseWheelEventHandler'
import { Bindings as Bindings, SingleEvent, EventType } from './state/interfaces'


export default class EventHandler<T> {
	private keyEventHandler?: KeyEventHandler
	private mouseEventHandler?: MouseEventHandler<T>
	private mouseWheelEventHandler?: MouseWheelEventHandler<T>
	private mousemoveEventHandler?: SingleEvent
	private mouseupEventHandler?: SingleEvent

	public removeEventListener(type: EventType): void {
		this.element.removeEventListener(type, this[type])
	}

	constructor(binds: Bindings<T>, private element: HTMLElement,
		private resolver: (target?: Element | null) => T) {

		if (binds.keybinds) {
			this.keyEventHandler = new KeyEventHandler(binds.keybinds)
			element.addEventListener(EventType.KEYUP, this.keyup)
		}

		if (binds.mousebinds) {
			this.mouseEventHandler = new MouseEventHandler<T>(binds.mousebinds)
			element.addEventListener(EventType.MOUSEDOWN, this.mousedown)

			if (binds.mousebinds[MouseButton.MIDDLE]) {
				this.mouseWheelEventHandler = new MouseWheelEventHandler<T>(binds.mousebinds)
				element.addEventListener(EventType.MOUSEWHEEL, this.wheel)
			}
		}

		if (binds.mousemove) {
			this.mousemoveEventHandler = binds.mousemove
			element.addEventListener(EventType.MOUSEMOVE, this.mousemove)
		}

		if (binds.mouseup) {
			this.mouseupEventHandler = binds.mouseup
			element.addEventListener(EventType.MOUSEUP, this.mouseup)
		}
	}


	// All non-null assertions have been replaced with explicit assert() calls. In any case if a
	// [EventType] method has been called, then the associated handler *has* been initialized in the
	// constructor and is therefore accessible. Might disable the no-non-null-assertion rule though.

	private [EventType.KEYUP] = (event: Event) => {
		assert(this.keyEventHandler)
		this.keyEventHandler.call(<KeyboardEvent> event)
	}

	private [EventType.MOUSEDOWN] = (event: Event) => {
		assert(this.mouseEventHandler)
		// Resolver should not be applied on event.target but on the match returned by the
		// eventHandler. This is because events can bubble up, which ultimately, will end
		// up getting caught on a different event target.
		const match = this.mouseEventHandler.call(<MouseEvent> event)
		if (match) match.callback(event, this.resolver(match.target))
	}

	private [EventType.MOUSEWHEEL] = (event: Event) => {
		assert(this.mouseWheelEventHandler)
		const match = this.mouseWheelEventHandler.call(<WheelEvent> event)
		const direction = this.mouseWheelEventHandler.direction(<WheelEvent> event)
		if (match) match.callback(event, direction, this.resolver(match.target))
	}

	private [EventType.MOUSEMOVE] = (event: Event) => {
		assert(this.mousemoveEventHandler)
		this.mousemoveEventHandler.callback(event, this.resolver())
	}

	private [EventType.MOUSEUP] = (event: Event) => {
		assert(this.mouseupEventHandler)
		const { callback, once } = this.mouseupEventHandler
		callback(event, this.resolver())
		if (once) this.element.removeEventListener('mouseup', this.mouseup)
	}
}