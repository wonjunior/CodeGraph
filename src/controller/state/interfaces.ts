import { MouseButton } from '../MouseCode'

export type StateData = {[k: string]: string} //? string val?

type Events = {[k: string]: Function}

export interface SingleEvent {
    callback: Function,
    once: boolean,
}

export interface Mousebinds {
    all?: { on?: Events, off?: Events },
    [MouseButton.MIDDLE]?: Events, // might separate from Mousebinds
    [MouseButton.RIGHT]?: { on?: Events, off?: Events },
    [MouseButton.LEFT]?: { on?: Events, off?: Events },
}

export type Keybinds = Events

export interface State {
    keybinds?: Events,
    mousebinds?: Mousebinds,
    mousemove?: SingleEvent,
    mouseup?: SingleEvent,
    data?: StateData,
}

export enum EventType {
    MOUSEMOVE = 'mousemove',
    MOUSEUP = 'mouseup',
    MOUSEDOWN = 'mousedown',
    KEYUP = 'keyup',
}