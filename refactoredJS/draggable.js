'use strict'

class Draggable {

    constructor({ type, event, element, object, /*bounderyClamp,*/ callback }) {
        //                            <? just setter position

        this.element = element;
        this.object = object;

        if (type == 'drag') {

            this.startDrag(event, /*bounderyClamp,*/ callback);

        } else if (type == 'stick') {

            this.startStick(event, /*bounderyClamp,*/ callback);

        }

    };

    startDrag(e, /*bounderyClamp,*/ callback) {

        this.zoomLevel = Canvas.zoomLevel;

        const rect = this.element.getBoundingClientRect();
        const rectP = this.element.parentElement.getBoundingClientRect();
        this.offset = {
            x: e.clientX - rect.x + rectP.x,
            y: e.clientY - rect.y + rectP.y
        };

        Draggable.event = event => {

            this.dragging(event/*, bounderyClamp*/);

            if (callback) callback();

        };

        document.addEventListener('mousemove', Draggable.event);
        document.addEventListener('mouseup', this.endDrag, { once: true });

    };

    dragging(e, bounderyClamp) {

        // <? View<mousePosition> is doing the exact same thing
        let targetPosition = [
            (e.clientX - this.offset.x) / this.zoomLevel,
            (e.clientY - this.offset.y) / this.zoomLevel
        ];

        // this.object.position = bounderyClamp(targetPosition);
        this.object.position = targetPosition;

    };

    endDrag() {

        document.removeEventListener('mousemove', Draggable.event);

    };

};
