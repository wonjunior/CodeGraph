'use strict'

/**
 * Helper class that associates key codes with their names
 */
class KeyCode {

	/**
	 * Hash table mapping key codes and key names
	 */
	static list;

	/**
	 * Gives the key combination name corresponding to provided Event
	 * @param {Event} event a document event
	 */
    static get({ keyCode, ctrlKey, shiftKey, altKey }) {

        const modKey = (ctrlKey ? 'ctrl_' : '') + (shiftKey ? 'shift_' : '') + (altKey ? 'alt_' : '');

        return KeyCode.list[ keyCode ] ? (modKey + KeyCode.list[ keyCode ]) : null;

    }

}

class KeyEventHandler {

    constructor(event, state) {

        this.state = state;

        const keyName = KeyCode.get(event);

        this.checkKeybinds(keyName);

    }

    checkKeybinds(keyName) {

        const eventCallback = this.state.keybinds[ keyName ] || this.state.keybinds[ 'alphabet' ];

        if (eventCallback) eventCallback.bind(this.state.data)(event);

    }

}