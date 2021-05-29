
export enum MouseButton { LEFT, MIDDLE, RIGHT }

/**
 * Helper class that associates mouse button codes codes with their names
 */
export class MouseCode {
    /**
     * Hash table mapping mouse codes and mouse buttons
     */
    static list: {[k: number]: string}

    /**
     * Gives the button name associated with the mouse code
     */
    static get(event: MouseEvent): MouseButton {
        return event instanceof WheelEvent ? MouseButton.MIDDLE : event.button 
    }
}