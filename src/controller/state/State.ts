// import $ from '@/ConsoleWriter'
import { MouseButton } from '../MouseCode'

type StateData = {[k: string]: string} //? string val?
type Events = {[k: string]: Function}

export interface StateDef {
    id: Symbol,
    keybinds: Events,
    mousebinds: {
        all?: { on?: Events, off?: Events },
        [MouseButton.MIDDLE]?: Events,
        [MouseButton.RIGHT]?: { on?: Events, off?: Events },
        [MouseButton.LEFT]?: { on?: Events, off?: Events },
    }
    data?: StateData,
}

/**
 * Data structure for managing event handler states. Each state bundles a set of keybinds and mousebinds.
 */
export class State {
    /**
     * Contains all the states that have been instanciated
     */
    static all = new Map<Symbol, StateDef>()
    static current: StateDef

    /**
     * Adds a new state that can later be used with `State.change`
     */
    constructor({ id, keybinds, mousebinds }: StateDef) {
        State.all.set(id, Object.assign(this, { id, keybinds, mousebinds }))
    }

    /**
     * Changes the state to the one associated with the provided symbol
     * @param symbol the identifier of the state
     * @param data the object that can be passed to the new state
     */
    static change(symbol: Symbol, data: StateData = {}) {
        if (!State.all.has(symbol)) throw new Error(`The provided id (${symbol}) doesn't exist`)

        // $.State.log(`state changed to ${State.all.get(symbol).id.toString()}`)
        State.current = { ...(State.all.get(symbol) as StateDef), data }
    }

}