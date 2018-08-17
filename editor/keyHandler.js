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

        // _(event.target);

    }

});


class State {

    constructor({ defaultState, name, keybinds, mousebinds }) {

        this.keybinds = keybinds || {};
        this.mousebinds = mousebinds || {};

        if (defaultState) {

            State.default = this;

        } else {

            if (name == 'editor') {

                State.current = this;

            }

            State.all[ name ] = this;

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
    9: 'tab',
    27: 'escape',
    32: 'spacebar',
    38: 'arrowup',
    40: 'arrowdown',
}

class keyEvent {

    constructor(event, state) {

        this.state = state;

        const keyName = Key.getName(event.keyCode) || 'other';

        this.checkKeybinds(keyName);

    };

    checkKeybinds(keyName) {

        const keybinds = {
            ...State.default.keybinds,
            ...this.state.keybinds,
        };

        const eventCallback = keybinds[ keyName ];

        if (eventCallback) eventCallback(event);

    };

};

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

class mouseEvent {

    constructor(event, state) {

        this.state = state;

        this.watchElements(event);

    }

    watchElements(event) {

        const buttonName = Mouse.getName(event.button);

        const [ elementsOnClick, elementsOffClick ] = (({ not, ...on }) => {

            return [ on || {}, not || {} ];

        })({                                         // state    button
            ...State.default.mousebinds.left,        // default  LMB
            ...this.state.mousebinds.all,            // current  ALL
            ...this.state.mousebinds[ buttonName ]   // current  button
        });

        this.checkSelectorsOn(event, elementsOnClick);
        this.checkSelectorsOff(event, elementsOffClick);

    };

    checkSelectorsOn(event, watchedElements) {

        this.targetIdentifiers(event.target).forEach(selector => {

            const eventCallback = watchedElements[ selector ];

            if (eventCallback) {

                eventCallback(event);

            }

        });

    };

    checkSelectorsOff(event, watchedElements) {

        Object.entries(watchedElements).forEach(([watchedElementSelector, eventCallback]) => {

            if (!~this.targetIdentifiers(event.target).indexOf(watchedElementSelector)) {

                eventCallback(event);

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


document.addEventListener('keyup', event => {

    new keyEvent(event, State.current);

});

document.addEventListener('mousedown', event => {

    new mouseEvent(event, State.current);

});
