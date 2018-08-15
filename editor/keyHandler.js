'use strict'

// <? keyHandler.js is getting crowded make mouseHandler.js
document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('window') && event.button == 2) {

        new Draggable({
            event,
            type: 'drag',
            element: Canvas.element,
            object: Canvas,
            // bounderyClamp: Canvas.draggableBoundaryClamp,
        });

    } else if (event.target.tagName == 'path') {

        _(event.target.id);

    } else if (event.target.tagName == 'TD') {

        const nodeObject = nodeFinder.select(event);
        new Draggable({
            event,
            type: 'stick',
            element: nodeObject.nodeElement,
            object: nodeObject
        });

    } else {

        _(event.target);

    }

});


class State {

    constructor({ defaultState, name, keybinds, mousebinds }) {

        this.keybinds = keybinds;
        this.mousebinds = mousebinds;

        State.all[ name ] = this;

        if (defaultState) {

            State.current = this;

        }

    }

    static change(newState) {

        State.current = State.all[ newState ];

    };

};

State.all = {};

class Key {

    static getName(keyCode) {

        return Key.codes[ keyCode ];

    };

}

Key.codes = {
    32: 'spacebar',
    27: 'escape',
    40: 'arrowdown',
    38: 'arrowup'
}

class Mouse {

    static getName(mouseCode) {

        return Mouse.codes[ mouseCode ];

    };

}

Mouse.codes = {
    0: 'left',
    1: 'middle',
    2: 'right'
}


document.addEventListener('keyup', event => {

    const keyName = Key.getName(event.keyCode) || 'other';
    const eventCallback = State.current.keybinds[ keyName ];

    if (eventCallback) {

        eventCallback(event);

    }

});

document.addEventListener('mousedown', event => {

    const buttonName = Mouse.getName(event.button) || 'other';
    const eventCallbacks = State.current.mousebinds[ buttonName ];

    if (eventCallbacks) {

        [
            ...event.target.classList,
            ...event.target.tagName.toLowerCase(),
            'document'

        ].forEach(selector => {

            const eventCallback = State.current.mousebinds[ buttonName ][ selector ];

            if (eventCallback) {

                eventCallback(event);

            }

        });

    }

});
