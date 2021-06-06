import { MouseButton } from '../MouseCode'

export type StateData = {[k: string]: string} //? string val?

type Events = {[k: string]: Function}

export interface State {
    keybinds: Events,
    mousebinds: {
        all?: { on?: Events, off?: Events },
        [MouseButton.MIDDLE]?: Events,
        [MouseButton.RIGHT]?: { on?: Events, off?: Events },
        [MouseButton.LEFT]?: { on?: Events, off?: Events },
    }
    data?: StateData,
}