import KeyEventHandler from './KeyEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import MouseWheelEventHandler from './MouseWheelEventHandler'
import { StateManager } from './state/StateManager'

// captures all keyboard input on the document
document.addEventListener('keyup', event => {
    new KeyEventHandler(event, StateManager.current)
})

// captures all mouse button clicks on the document
document.addEventListener('mousedown', event => {
    new MouseEventHandler(event, StateManager.current)
})

// captures all mouse wheel actions on the document
document.addEventListener('wheel', event => {
    new MouseWheelEventHandler(event, StateManager.current)
})