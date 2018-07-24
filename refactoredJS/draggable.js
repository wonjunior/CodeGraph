'use strict'

class Draggable {

    constructor(event, element, object) {

        this.element = element;
        this.object = object;

        this.startDrag(event);

    };

    startDrag(e) {

        this.zoomLevel = Canvas.zoomLevel;

        const rect = this.element.getBoundingClientRect();
        const rectP = this.element.parentElement.getBoundingClientRect();
        this.offset = {
            x: e.clientX - rect.x + rectP.x,
            y: e.clientY - rect.y + rectP.y
        };

        Draggable.event = event => { this.dragging(event) };
        document.addEventListener('mousemove', Draggable.event);
        document.addEventListener('mouseup', this.endDrag, { once: true });

    };

    dragging(e) {

        _(this.object.position);
        this.object.position = [
            (e.clientX - this.offset.x) / this.zoomLevel,
            (e.clientY - this.offset.y) / this.zoomLevel
        ];

    };

    endDrag() {

        document.removeEventListener('mousemove', Draggable.event);

    };

};


document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('header') && event.button == 0) {

        const nodeObject = node[event.target.ref];
        new Draggable(event, nodeObject.nodeElement, nodeObject);

    } else if (event.target.classList.contains('dock')) {

        _('dock');

    } else if (event.target.classList.contains('objects') && event.button == 2) {

        new Draggable(event, event.target, Canvas);

    } else {

        _(event.target.classList)

    }

});
