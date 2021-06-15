import { MouseCode } from './MouseCode'
import { Mousebinds } from './state/interfaces'

/**
 * Contains information regarding the event: the `event` object itself, the selector that caught
 * the event and the target element as well as the actual function that needs to be called: `callback`.
 */
export interface EventPayload { //# replace Function
    callback: Function,
    event: Event,
    selector: string
    distance: number,
    target: Element | null,
}

/**
 * Any events of type `MouseEvent`, triggered on the document, are handled here.
 */
export class MouseEventHandler<T> {
    constructor(protected binds: Mousebinds<T>) {}

    // public call(event: MouseEvent) {
    //     // $.Event.log(`┌── new <MouseEventHandler> state = ${State.current.id.toString()}`)
    //     // $.Event.pipe()
    //     // $.Event.log('(1) bubble path:', [event.path])

    //     return this.checkSelectors(event)

    //     // $.Event.unindent()
    //     // $.Event.log(`└──/ <MouseEventHandler> ended`)
    // }

    /**
     * Depending on the key that was pressed, check for "on-element" and "off-element" triggers.
     */
    public call(event: MouseEvent): EventPayload | undefined {
        const code = MouseCode.get(event)

        const { off, on } = { ...this.binds.all, ...this.binds[code] }

        // $.Event.log(`(2) candidates for "${buttonName} mouse button":`)

        // $.Event.indent()
        // $.Event.log('└──> (on-candidates)', Object.keys(on || {}))
        const matchedOn = this.checkSelectorsOn(event, Object.entries(on || {}))
        if (matchedOn) return matchedOn

        // $.Event.log('└──> (not on el.)', Object.keys(off || {}))
        const matchedOff = this.checkSelectorsOff(event, Object.entries(off || {}))
        if (matchedOff) return matchedOff
        // $.Event.unindent()
    }

    /**
     * Finds the event handler that is the closest one to the element that fired the event, then calls its callback.
     * @param event
     * @param candidates contains the selectors as keys and callbacks as values
     */
    protected checkSelectorsOn(event: Event, candidates: [string, Function][]): EventPayload | undefined {
        const matches = candidates.map(([selector, callback]) => {
            const targets = event.composedPath() as Element[]
            const i = targets.findIndex(t => t.matches && t.matches(selector))

            if (~i) return { distance: i, target: targets[i], callback, event, selector }

        }).filter(Boolean) as EventPayload[]

        // $.Event.indent()
        // $.Event.log(`(1) cross match`, matches.map(({target, distance}) => `.${target.classList}#${target.id} (d=${distance})`))

        if (matches.length) {
            const match = matches.reduce((min, curr) => curr.distance < min.distance ? curr : min)
            // $.Event.log(`(2) closest match`, match.target)
            // $.Event.log(`(3) executing callback`)
            // $.Event.unindent()
            return match
        }

        // $.Event.log('(2) no match, exiting.')
        // $.Event.unindent()
    }

    /**
     * Finds the event handlers that are not in the event element tree then calls their callbacks
     * @param selectors contains the selectors as keys and callbacks as values
     */
    private checkSelectorsOff(event: Event, selectors: [string, Function][]): EventPayload | undefined {
        // $.Event.indent()
        // $.Event.log(`(1) checking for selectors with zero match to elements of event path`)

        const match = selectors.find(([selector]) => {
            const targets = event.composedPath() as Element[]
            const noMatch = targets.every(el => !(el.matches && el.matches(selector)))

            if (noMatch) return true
            // $.Event.indent()
            // $.Event.log('- not a single match for', selector, 'executing callback')
            // $.Event.unindent()

            // this.trigger({ callback, event, selector, distance: 0 })
        })

        if (!match) return match

        const [selector, callback] = match
        return { event, selector, callback, target: null, distance: 0 }

        // $.Event.unindent()
    }
}