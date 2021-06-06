import { KeyCode } from './KeyCode'
import { State } from './state/interfaces'

export default class KeyEventHandler {
    constructor(event: KeyboardEvent, public state: State) {
        const keyName = KeyCode.get(event)
        if (!keyName) return

        const eventCallback = this.state.keybinds[keyName]
        if (eventCallback) eventCallback.bind(this.state.data)(event)
    }
}