
export enum MouseButton { LEFT, MIDDLE, RIGHT }

/**
 * Helper class that associates mouse button codes codes with their names
 */
export class MouseCode {
    /**
     * Gives the button name associated with the mouse code
     */
    static get(event: MouseEvent): MouseButton {
        return event.button
    }
}