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
            callback:  nodeObject.draggableCallback.bind(nodeObject)
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

        const nodeObject = nodeFinder.select(event.target.id);
        //new Draggable(event, nodeObject.nodeElement, nodeObject); // no need to update links

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

// State.current: e.g. {name, spacebar, ...}
// State.all: {state1: {}, state2: {}, ...}


class Key {

    static getName(keyCode) {

        return Key.keyCodes[ keyCode ];

    };

}

Key.keyCodes = {
    32: 'spacebar',
    27: 'escape',
}


document.addEventListener('keyup', event => {

    const keyName = Key.getName(event.keyCode);

    if (State.current[ keyName ]) {

        const newState = State.current[ keyName ](event);

    }

})


/*document.addEventListener('keyup', event => {

    // _(event.keyCode)

    // [Spacebar] is clicked, finder is unlocked and hidden
    if (event.keyCode == 32 && !nodeFinder.visible && !nodeFinder.isLocked) {

        nodeFinder.show();
        event.preventDefault();

    } else if (nodeFinder.visible) {

        switch(event.keyCode) {

            case 27: // [Escape]
                nodeFinder.hide();
                break;

            case 40: // [▼]
                nodeFinder.down();
                break;

            case 38: // [▲]
                nodeFinder.up();
                break;

            default:
                nodeFinder.search(event.target.value);

        }

    };

});*/
