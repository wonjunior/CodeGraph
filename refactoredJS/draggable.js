'use strict'

class Draggable {

    constructor(event, element, object, callback) {
    //                        <? or simply position (setter)

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

            if (callback) callback(); // this must be "inside dragging()"

        };
        document.addEventListener('mousemove', Draggable.event);
        document.addEventListener('mouseup', this.endDrag, { once: true });

    };

    dragging(e) {

        // <? View<mousePosition> is doing the exact same thing
        let targetPos = [
            (e.clientX - this.offset.x) / this.zoomLevel,
            (e.clientY - this.offset.y) / this.zoomLevel
        ];

        this.object.position = targetPos.map((value, i) => {

            const minLimit = 0;
            const maxLimit = (Canvas.size[i] - this.object.size[i]) / Canvas.zoomLevel;

            _(value, [minLimit, maxLimit])

            if (value <= minLimit) {

                return minLimit;

            } else if (value >= maxLimit) {

                return Math.round(maxLimit);

            }

            return value

        });

        return;

        //

        const properties = this.element.getBoundingClientRect();
        // following two lines might as well be in a method of this.object
        const truePosition = [ properties.x, properties.y ];

        this.object.position = targetPos.map((value, i) => {

            const minLimit = - truePosition[i] / Canvas.zoomLevel + Canvas.position[i] /*- 1*/;
            const maxLimit = minLimit - (this.object.size[i] - View.screenSize[i]) / Canvas.zoomLevel;


            if (value >= minLimit) {

                return Math.round(minLimit);

            } else if (value <= maxLimit) {

                return Math.round(maxLimit);

            }

            return value;

        });


        /*const calculated = - properties.x / Canvas.zoomLevel + Canvas.position[0];

        // calculated < newPos[0] 0 position is lower than current position

        _('condition: ', calculated <= newPos[0])
        if (calculated <= newPos[0]) {

            newPos[0] = (function({ x, y }, [ absX , absY ]) {

                return Math.round(- x / Canvas.zoomLevel + absX - 1); // <? careful w/ 1

            })(properties, Canvas.position);


        }

        Canvas.position = newPos;*/

    };

    endDrag() {

        document.removeEventListener('mousemove', Draggable.event);

    };

};
