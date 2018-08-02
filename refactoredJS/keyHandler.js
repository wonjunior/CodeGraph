'use strict'

document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('header') && event.button == 0) {

        const nodeObject = node[ event.target.ref ];
        new Draggable(event, nodeObject.nodeElement, nodeObject, () => { nodeObject.updateLink() });

    } else if (event.target.classList.contains('snapDock')) {

        const dockObject = dock[ event.target.ref ];
        new Linkable(event, dockObject);

    } else if (event.target.classList.contains('objects') && event.button == 2) {

        new Draggable(event, event.target, Canvas);

    } else if (event.target.tagName == 'path') {

        _(event.target.id);

    } else {

        _(event.target)

    }

});
