'use strict'

class Draggable {

    constructor({ type, event, element, object, /*bounderyClamp,*/ callback }) {
        //                            <? just setter position

        this.element = element;
        this.object = object;

        if (type == 'drag') {

            this.startDrag(event, /*bounderyClamp, */ callback);

        } else if (type == 'stick') {

            this.startStick(event, /*bounderyClamp, */ callback);

        }

    };

    startStick(e, /*bounderyClamp, */ callback) {

        const parentProp = this.element.parentElement.getBoundingClientRect();
        this.offset = [
            parentProp.x + 50,
            parentProp.y + 10
        ];

        const eventHandler = event => {

            this.dragging(event/*, bounderyClamp*/);

            if (callback) callback();

        };

        this.dragging(e);

        document.addEventListener('mousemove', eventHandler);
        document.addEventListener('mousedown', () => this.endDrag(eventHandler), { once: true });

    };

    startDrag(e, /*bounderyClamp, */ callback) {

        const selfProp = this.element.getBoundingClientRect();
        const parentProp = this.element.parentElement.getBoundingClientRect();
        this.offset = [
            e.clientX - selfProp.x + parentProp.x,
            e.clientY - selfProp.y + parentProp.y
        ];

        const eventHandler = event => {

            this.dragging(event/*, bounderyClamp*/);

            if (callback) callback();

        };

        document.addEventListener('mousemove', eventHandler);
        document.addEventListener('mouseup', () => this.endDrag(eventHandler), { once: true });

    };

    dragging(e, bounderyClamp) {

        const [ offsetX, offsetY ] = this.offset;

        // <? View<mousePosition> is doing the exact same thing
        let targetPosition = [
            (e.clientX - offsetX) / Canvas.zoomLevel,
            (e.clientY - offsetY) / Canvas.zoomLevel
        ];

        // this.object.position = bounderyClamp(targetPosition);
        this.object.position = targetPosition;

    };

    endDrag(fct) {

        document.removeEventListener('mousemove', fct);

    };

};
