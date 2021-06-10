// import $ from '@/ConsoleWriter'
import { assert } from '@/utils'
import { MouseButton } from '../MouseCode'
import { Bindings } from './interfaces'


/**
 * Data structure for managing event handler states. Each state bundles a set of keybinds and mousebinds.
 */
// export class StateManager {
//     /**
//      * Contains all the states that have been instanciated
//      */
//     static all = new Map<Symbol, State>()
//     static current: State

//     /**
//      * Adds a new state that can later be used with `State.change`
//      */
//     constructor(id, { keybinds, mousebinds }: State) {
//         StateManager.all.set(id, Object.assign(this, { keybinds, mousebinds }))
//     }

//     /**
//      * Changes the state to the one associated with the provided symbol
//      * @param symbol the identifier of the state
//      * @param data the object that can be passed to the new state
//      */
//     static change(symbol: symbol, data: StateData = {}) {
//         assert(StateManager.all.has(symbol), `The provided id (${String(symbol)}) doesn't exist`)

//         // $.State.log(`state changed to ${State.all.get(symbol).id.toString()}`)
//         StateManager.current = { ...(StateManager.all.get(symbol) as State), data }
//     }

// }