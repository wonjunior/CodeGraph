'use strict'

class Canvas {

    static get zoomLevel() {

        return Canvas.element.style.transform.replace(/[^\d.]/g, '') || 1;

    };

    static set zoomLevel(scale) {

        Canvas.element.style.transform = `scale(${scale})`;

    };

};

Canvas.element = document.querySelector('.canvas');


class Draggable {

    constructor(event, element) {

        this.element = element;

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

        this.element.style.left = `${ (e.clientX - this.offset.x) / this.zoomLevel }px`;
        this.element.style.top = `${ (e.clientY - this.offset.y) / this.zoomLevel }px`;

    };

    endDrag() {

        document.removeEventListener('mousemove', Draggable.event);

    };

};


document.addEventListener('mousedown', event => {

    if (event.target.classList.contains('header') && event.button == 0) {

        const nodeElement = node[event.target.ref].nodeElement;
        new Draggable(event, nodeElement);

    } else if (event.target.classList.contains('dock')) {

        _('dock');

    } else if (event.target.classList.contains('objects') && event.button == 2) {

        new Draggable(event, event.target);

    } else {

        _(event.target.classList)

    }

});
