
/**
 * Helper class that associates key codes with their names
 */
export class KeyCode {
    /**
     * Gives the key combination name corresponding to provided Event.
     */
    static get({ code, ctrlKey, shiftKey, altKey }: KeyboardEvent) {
        return `${ctrlKey ? 'Ctrl_' : ''}${shiftKey ? 'Shift_' : ''}${altKey ? 'Alt_' : ''}${code}`
    }
}