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
            bounderyClamp: nodeObject.draggableBoundaryClamp.bind(nodeObject),
            callback:  nodeObject.draggableCallback.bind(nodeObject)
        });

    } else if (event.target.classList.contains('snapDock') && event.button == 0) {

        const dockObject = dock[ event.target.ref ];
        new Linkable(event, dockObject);

    } else if (event.target.classList.contains('objects') && event.button == 2) {

        new Draggable({
            event,
            type: 'drag',
            element: event.target,
            object: Canvas,
            bounderyClamp: Canvas.draggableBoundaryClamp,
        });

    } else if (event.target.tagName == 'path') {

        _(event.target.id);

    } else if (event.target.classList.contains('finder') && nodeFinder.visible) {

        nodeFinder.hide(); // not only nodeFinder...

    } else if (event.target.tagName == 'TD') {

        const nodeObject = nodeFinder.select(event.target.id);
        //new Draggable(event, nodeObject.nodeElement, nodeObject); // no need to update links

    } else {

        _(event.target);

    }

});



document.addEventListener('keyup', event => {

    // _(event.keyCode)

    // finder is hidden and [Spacebar] is clicked
    if (!nodeFinder.visible && event.keyCode == 32) {

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

});
