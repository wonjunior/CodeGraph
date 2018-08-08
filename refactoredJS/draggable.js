'use strict'

class Draggable {

    constructor(event, element, object, callback) {

        this.element = element;
        this.object = object;

        this.startDrag(event, callback);

    };

    startDrag(e, callback) {

        this.zoomLevel = Canvas.zoomLevel;

        const rect = this.element.getBoundingClientRect();
        const rectP = this.element.parentElement.getBoundingClientRect();
        this.offset = {
            x: e.clientX - rect.x + rectP.x,
            y: e.clientY - rect.y + rectP.y
        };

        Draggable.event = event => {

            this.dragging(event);

            if (callback) callback();

        };
        document.addEventListener('mousemove', Draggable.event);
        document.addEventListener('mouseup', this.endDrag, { once: true });

    };

    dragging(e) {

        let newPos = [
            (e.clientX - this.offset.x) / this.zoomLevel,
            (e.clientY - this.offset.y) / this.zoomLevel
        ];

        this.object.position = newPos;

        /*const pageSize = [ window.innerWidth, window.innerHeight ];

        this.object.position = newPos.map((value, i) => {

            if (value > 0) {

                return 0;

            } else if (value < pageSize[i] - 5000) { // Canvas.size[i]

                return pageSize[i] - 5000; // Canvas.size[i]

            }

            return value;

        });*/

    };

    endDrag() {

        document.removeEventListener('mousemove', Draggable.event);

    };

};
