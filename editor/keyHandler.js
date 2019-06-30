'use strict'

// <? keyHandler.js is getting crowded make mouseHandler.js
document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('objects') && event.button == 2) {					/* finitepane-rollback */

        new Draggable({
            event,
            type: 'drag',
            element: event.target,															/* finitepane-rollback */
            object: Canvas,
            bounderyClamp: Canvas.draggableBoundaryClamp,									/* finitepane-rollback */
        });

    } else if (event.target.tagName == 'PATH') {

        _(event.target.id);

    } else if (event.target.tagName == 'TD') {

        const nodeObject = nodeFinder.select(event);
        new Draggable({
            event,
            type: 'stick',
            element: nodeObject.element.node,
            object: nodeObject
        });

    } else {

        // _(event.target);

    }

});

// <? add mixins
class State {

	static all = {};

    constructor({ id, keybinds = {}, mousebinds = {} }) {

		Object.assign(this, {
			id,
			keybinds,
			mousebinds
		});

		State.all[ id ] = this;

    }

    static change(stateId, data = {}) {

		if (typeof stateId != 'symbol') throw new Error(`First argument for State.change must be a symbol, instead received: ${typeof stateId} (${stateId})`);

        State.current = State.all[ stateId ];
        State.current.data = data;

    }

}

/**
 * Helper class that associates key codes with their names
 */
class Key {

	/**
	 * Hash table mapping key codes and key names
	 */
	static list;

	/**
	 * Gives the key combination name corresponding to provided Event
	 * @param {Event} event a document event
	 */
    static getName({ keyCode, ctrlKey, shiftKey, altKey }) {

        const modKey = (ctrlKey ? 'ctrl_' : '') + (shiftKey ? 'shift_' : '') + (altKey ? 'alt_' : '');

        return Key.list[ keyCode ] ? (modKey + Key.list[ keyCode ]) : null;

    }

}

/**
 * Helper class that associates mouse button codes codes with their names
 */
class Mouse {

	/**
	 * Hash table mapping mouse codes and mouse buttons
	 */
	static list = {
		0: 'left',
		1: 'middle',
		2: 'right'
	}

	/**
	 * Gives the button name associated with the mouse code
	 * @param {Event} event a document event
	 */
    static getName({ button }) {

        return Mouse.list[ button ];

    }

}

class keyEvent {

    constructor(event, state) {

        this.state = state;

        const keyName = Key.getName(event) || 'other';

        this.checkKeybinds(keyName);

    }

    checkKeybinds(keyName) {

        const keybinds = /*{
            ...State.default.keybinds,
            ...*/this.state.keybinds/*,
        }*/

        const eventCallback = keybinds[ keyName ];

        if (eventCallback) eventCallback.bind(this.state.data)(event);

    };

}

class mouseEvent {

    constructor(event, state) {

        this.state = state;

        this.watchElements(event);

    }

    watchElements(event) {

        const buttonName = Mouse.getName(event);

        const [ elementsOnClick, elementsOffClick ] = (({ not, ...on }) => {

            return [ on || {}, not || {} ];

        })({                                         // state    button
            // ...State.default.mousebinds.left,        // default  LMB
            ...this.state.mousebinds.all,            // current  ALL
            ...this.state.mousebinds[ buttonName ]   // current  button
        });

        this.checkSelectorsOn(event, elementsOnClick);
        this.checkSelectorsOff(event, elementsOffClick);

    };

    checkSelectorsOn(event, watchedElements) {

        this.targetIdentifiers(event.target).forEach(selector => {

            const eventCallback = watchedElements[ selector ];

            if (eventCallback) eventCallback.bind(this.state.data)(event);

        });

    };

    checkSelectorsOff(event, watchedElements) {

        Object.entries(watchedElements).forEach(([watchedElementSelector, eventCallback]) => {

            if (!~this.targetIdentifiers(event.target).indexOf(watchedElementSelector)) {

                eventCallback.bind(this.state.data)(event);

            }

        });

    };

    targetIdentifiers(element) {

        return [
            ...event.target.classList,
            event.target.tagName.toLowerCase(),
            'document'
        ];

    };

};


// captures all keyboard input on the document
document.addEventListener('keyup', event => {

    new keyEvent(event, State.current);

});

// captures all mouse events (on any mouse button) on the document
document.addEventListener('mousedown', event => {

    new mouseEvent(event, State.current);

});

/*document.addEventListener('keydown', event => {

    if (event.keyCode == 9) {

        event.preventDefault();

    }

});*/