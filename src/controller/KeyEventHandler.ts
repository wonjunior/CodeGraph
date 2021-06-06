import { KeyCode } from './KeyCode'
import { Keybinds } from './state/interfaces'

export default class KeyEventHandler {
    constructor(private binds: Keybinds) {}

    public call(event: KeyboardEvent) {
        const keyName = KeyCode.get(event)
        if (!keyName) return

        const eventCallback = this.binds[keyName]
        if (eventCallback) eventCallback(event) //? formerly there was a binds on this.state.data
    }
}