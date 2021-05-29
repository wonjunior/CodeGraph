import { MouseCode } from './MouseCode'
import { StateDef } from './state/State'

/**
 * Contains information regarding the event: the `event` object itself, the selector that caught
 * the event and the target element as well as the actual function that needs to be called: `callback`.
 */
export interface EventPayload {
    callback: Function,
    event: Event,
    selector: string
    distance: number,
    target?: Element | null,
}

/**
 * Any events of type `MouseEvent`, triggered on the document, are handled here.
 */
export class MouseEventHandler {
    /**
     * A new instance is created everytime the mouse is clicked.
     * @param event the event that needs to be handled
     * @param state the state that will respond to this event
     */
    constructor(event: MouseEvent, protected state: StateDef) {
        // $.Event.log(`┌── new <MouseEventHandler> state = ${State.current.id.toString()}`)
        // $.Event.pipe()
        // $.Event.log('(1) bubble path:', [event.path])

        this.checkSelectors(event)

        // $.Event.unindent()
        // $.Event.log(`└──/ <MouseEventHandler> ended`)
    }

    /**
     * Depending on the key that was pressed, check for "on-element" and "off-element" triggers.
     */
    checkSelectors(event: MouseEvent) {
        const name = MouseCode.get(event)

        const { off, ...on } = { ...this.state.mousebinds.all, ...this.state.mousebinds[name] }

        // $.Event.log(`(2) candidates for "${buttonName} mouse button":`)

        // $.Event.indent()
        // $.Event.log('└──> (on-candidates)', Object.keys(on || {}))
        this.checkSelectorsOn(event, Object.entries(on || {}))

        // $.Event.log('└──> (not on el.)', Object.keys(off || {}))
        this.checkSelectorsOff(event, Object.entries(off || {}))
        // $.Event.unindent()
    }

    /**
     * Finds the event handler that is the closest one to the element that fired the event, then calls its callback.
     * @param event
     * @param candidates contains the selectors as keys and callbacks as values
     */
    checkSelectorsOn(event: Event, candidates: [string, Function][]) {
        const matches = candidates.map(([selector, callback]) => {
            const targets = event.composedPath() as Element[]
            const match = targets.findIndex(t => t.matches && t.matches(selector))

            if (!~match) return null
            return { distance: match, target: targets[match], callback, event, selector }

        }).filter(Boolean) as EventPayload[]

        // $.Event.indent()
        // $.Event.log(`(1) cross match`, matches.map(({target, distance}) => `.${target.classList}#${target.id} (d=${distance})`))

        if (matches.length) {
            const match = matches.reduce((min, curr) => curr.distance < min.distance ? curr : min)
            // $.Event.log(`(2) closest match`, match.target)
            // $.Event.log(`(3) executing callback`)
            // $.Event.unindent()
            return this.trigger(match)
        }

        // $.Event.log('(2) no match, exiting.')
        // $.Event.unindent()
    }

    /**
     * Finds the event handlers that are not in the event element tree then calls their callbacks
     * @param {MouseEvent} event
     * @param {Object} selectors contains the selectors as keys and callbacks as values
     */
    checkSelectorsOff(event: Event, selectors: [string, Function][]) {
        // $.Event.indent()
        // $.Event.log(`(1) checking for selectors with zero match to elements of event path`)

        selectors.forEach(([selector, callback]) => {
            const targets = event.composedPath() as Element[]
            const noMatch = targets.every(el => !(el.matches && el.matches(selector)))

            if (!noMatch) return
            // $.Event.indent()
            // $.Event.log('- not a single match for', selector, 'executing callback')
            // $.Event.unindent()
            this.trigger({ callback, event, selector, distance: 0 })
        })

        // $.Event.unindent()
    }

    /**
     * Executes the given callback binded to the state's data object.
     */
    trigger({ callback, event, selector, target = null }: EventPayload) {
        //? ( { callback, ...arguments }), then callback.bind(this.state.data)(arguments)
        callback.bind(this.state.data)({ event, selector, target })
    }
}