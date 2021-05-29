
/**
 * Helper class that associates key codes with their names
 */
export class KeyCode {
    /**
     * Gives the key combination name corresponding to provided Event.
     */
    static get({ key, ctrlKey, shiftKey, altKey }: KeyboardEvent) {
        return `${ctrlKey ? 'ctrl_' : ''}${shiftKey ? 'shift_' : ''}${altKey ? 'alt_' : ''}${key}`
    }
}