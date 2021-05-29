import KeyEventHandler from './KeyEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import MouseWheelEventHandler from './MouseWheelEventHandler'
import { State } from './state/State'

// captures all keyboard input on the document
document.addEventListener('keyup', event => {
    new KeyEventHandler(event, State.current)
})

// captures all mouse button clicks on the document
document.addEventListener('mousedown', event => {
    new MouseEventHandler(event, State.current)
})

// captures all mouse wheel actions on the document
document.addEventListener('wheel', event => {
    new MouseWheelEventHandler(event, State.current)
})