'use strict'

// <? keyHandler.js is getting crowded make mouseHandler.js
document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('header') && event.button == 0) {

        const nodeObject = node[ event.target.ref ];
        new Draggable({
            event,
            type: 'drag',
            element: nodeObject.nodeElement,
            object: nodeObject,
            // bounderyClamp: nodeObject.draggableBoundaryClamp.bind(nodeObject),
            callback:  nodeObject.update.bind(nodeObject)
        });

    } else if (event.target.classList.contains('snapDock') && event.button == 0) {

        const dockObject = dock[ event.target.ref ];
        new Linkable(event, dockObject);

    } else if (event.target.classList.contains('window') && event.button == 2) {

        new Draggable({
            event,
            type: 'drag',
            element: Canvas.element,
            object: Canvas,
            // bounderyClamp: Canvas.draggableBoundaryClamp,
        });

    } else if (event.target.tagName == 'path') {

        _(event.target.id);

    } else if (event.target.classList.contains('paramName') && event.button == 0)  {

        nodeFinder.isLocked = true;

        const dockObject = dock[ event.target.ref ];
        dockObject.edit(() => {
            nodeFinder.isLocked = false;
        });

    } else if (event.target.classList.contains('finder') && nodeFinder.visible && !nodeFinder.isLocked) {

        nodeFinder.hide(); // not only nodeFinder...

    } else if (event.target.tagName == 'TD') {

        const nodeObject = nodeFinder.select(event);
        new Draggable({
            event,
            type: 'stick',
            element: nodeObject.nodeElement,
            object: nodeObject
        });

        //event, nodeObject.nodeElement, nodeObject)

    } else {

        _(event.target);

    }

});


class State {

    constructor({ defaultState, name, keybinds }) {

        Object.assign(this, keybinds);

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

        return Key.keyCodes[ keyCode ];

    };

}

Key.keyCodes = {
    32: 'spacebar',
    27: 'escape',
    40: 'arrowdown',
    38: 'arrowup'
}


document.addEventListener('keyup', event => {

    const keyName = Key.getName(event.keyCode) || 'other';

    if (State.current[ keyName ]) {

        const newState = State.current[ keyName ](event);

    }

});
