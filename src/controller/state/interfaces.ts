import { MouseButton } from '../MouseCode'


export type MouseEventCallbacks<T> = { [k: string]: (event: MouseEvent, payload: T) => void }
export type KeyEventCallbacks = { [k: string]: (event: KeyboardEvent) => void }

export interface SingleEvent {
    callback: Function,
    once?: boolean,
}

export interface Mousebinds<T> {
    all?: { on?: MouseEventCallbacks<T>, off?: MouseEventCallbacks<T> },
    [MouseButton.MIDDLE]?: MouseEventCallbacks<T>, // might separate from Mousebinds
    [MouseButton.RIGHT]?: { on?: MouseEventCallbacks<T>, off?: MouseEventCallbacks<T> },
    [MouseButton.LEFT]?: { on?: MouseEventCallbacks<T>, off?: MouseEventCallbacks<T> },
}

export type Keybinds = KeyEventCallbacks

export interface Bindings<T> {
    keybinds?: Keybinds,
    mousebinds?: Mousebinds<T>,
    mousemove?: SingleEvent,
    mouseup?: SingleEvent,
}

export enum EventType {
    MOUSEMOVE = 'mousemove',
    MOUSEDOWN = 'mousedown',
    MOUSEUP = 'mouseup',
    KEYUP = 'keyup',
}