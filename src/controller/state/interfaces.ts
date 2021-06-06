import { MouseButton } from '../MouseCode'

export type StateData = {[k: string]: string} //? string val?

type Events = {[k: string]: Function}

export interface Mousebinds {
    all?: { on?: Events, off?: Events },
    [MouseButton.MIDDLE]?: Events,
    [MouseButton.RIGHT]?: { on?: Events, off?: Events },
    [MouseButton.LEFT]?: { on?: Events, off?: Events },
}

export type Keybinds = Events

export interface State {
    keybinds: Events,
    mousebinds: Mousebinds,
    data?: StateData,
}