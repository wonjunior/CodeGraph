'use strict'

class Canvas {

    static get zoomLevel() {

        const scaleFromStyle = Canvas.zoomWrapper.style.transform.replace(/[^\d.]/g, ''); // <? make class to handle it
        return  (1*scaleFromStyle) || 1;

    };

    static set zoomLevel(scale) {

        Canvas.zoomWrapper.style.transform = `scale(${scale})`;

    };

    static get position() {

        return [Canvas.element.style.left, Canvas.element.style.top]
            .map(posString => parseInt(posString));

    };

    static set position([ x, y ]) {

        Canvas.element.style.left = x + 'px';
        Canvas.element.style.top = y + 'px';

    };

    static get screenPosition()  {

        const properties = this.element.getBoundingClientRect();
        return [ properties.x, properties.y ];

    };

    static get size() {

        const properties = this.element.getBoundingClientRect();
        return [ properties.width, properties.height ];

    };

    /*static set size([ x, y ]) {

        // more complex than that: need to check
        //  a) not too small
        //  b) displace all the Canvas' content i.e. re-center the canvas
        Canvas.element.style.left = x + 'px';
        Canvas.element.style.top = y + 'px';

    };*/

};

Canvas.window = document.querySelector('.window');
Canvas.zoomWrapper = document.querySelector('.canvas');
Canvas.element = document.querySelector('.objects');
Canvas.nodeArea = document.querySelector('.nodes');
Canvas.linkArea = document.querySelector('.links > svg');
