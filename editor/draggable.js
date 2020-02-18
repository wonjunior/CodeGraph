'use strict'

class Draggable {

    constructor({ type, event, element, object, callback }) {                       /* bounderyClamp finitepane-rollback */
        //                            <? just setter position

        this.element = element;
        this.object = object;

        if (type == 'drag') {

            this.startDrag(event, callback);										/* bounderyClamp finitepane-rollback */

        } else if (type == 'stick') {

            this.startStick(event, callback);                                       /* bounderyClamp finitepane-rollback */

        }

    };

    startStick(e, callback) {													    /* bounderyClamp finitepane-rollback */

        const parentProp = this.element.parentElement.getBoundingClientRect();
        this.offset = [
            parentProp.x + 50,
            parentProp.y + 10
        ];

        const eventHandler = event => {

            this.dragging(event);												    /* bounderyClamp finitepane-rollback */

            if (callback) callback();

        };

        this.dragging(e);

        document.addEventListener('mousemove', eventHandler);
        document.addEventListener('mousedown', () => this.endDrag(eventHandler), { once: true });

    };

    startDrag(e, callback) {														/* bounderyClamp finitepane-rollback */

        const selfProp = this.element.getBoundingClientRect();
        const parentProp = this.element.parentElement.getBoundingClientRect();
        this.offset = [
            e.clientX - selfProp.x + parentProp.x,
            e.clientY - selfProp.y + parentProp.y
        ];

        const eventHandler = event => {

            this.dragging(event);												    /* bounderyClamp finitepane-rollback */

            if (callback) callback();

        };

        document.addEventListener('mousemove', eventHandler);
        document.addEventListener('mouseup', () => this.endDrag(eventHandler), { once: true });

    };

    dragging(e) {                                                                   /* bounderyClamp */

        const [ offsetX, offsetY ] = this.offset;

        // View.mousePosition(e) careful with the offset!
        let targetPosition = [
            (e.clientX - offsetX) / Canvas.zoomLevel,
            (e.clientY - offsetY) / Canvas.zoomLevel
        ];

        this.object.position = targetPosition;                                      /* bounderyClamp */

    };

    endDrag(fct) {

        document.removeEventListener('mousemove', fct);

    };

};
