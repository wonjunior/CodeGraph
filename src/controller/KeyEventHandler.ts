import { KeyCode } from './KeyCode'
import { StateDef } from './state/State'

export default class KeyEventHandler {
    constructor(event: KeyboardEvent, public state: StateDef) {
        const keyName = KeyCode.get(event)
        if (!keyName) return

        const eventCallback = this.state.keybinds[keyName]
        if (eventCallback) eventCallback.bind(this.state.data)(event)
    }
}