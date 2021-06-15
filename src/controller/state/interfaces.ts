import { MouseButton } from '../MouseCode'


export type MouseClickEventCallbacks<T> = { [k: string]: (event: MouseEvent, payload: T) => void }
export type MouseWheelEventCallback<T> = { [k: string]: (event: WheelEvent, direction: number, payload: T) => void }
export type KeyEventCallbacks = { [k: string]: (event: KeyboardEvent) => void }

export interface SingleEvent {
    callback: Function,
    once?: boolean,
}

export interface Mousebinds<T> {
    all?: { on?: MouseClickEventCallbacks<T>, off?: MouseClickEventCallbacks<T> },
    [MouseButton.MIDDLE]?: MouseWheelEventCallback<T>, // might separate from Mousebinds
    [MouseButton.RIGHT]?: { on?: MouseClickEventCallbacks<T>, off?: MouseClickEventCallbacks<T> },
    [MouseButton.LEFT]?: { on?: MouseClickEventCallbacks<T>, off?: MouseClickEventCallbacks<T> },
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
    MOUSEWHEEL = 'wheel',
    MOUSEUP = 'mouseup',
    KEYUP = 'keyup',
}