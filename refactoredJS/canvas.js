'use strict'

class Canvas {

    static get zoomLevel() {

        return Canvas.zoomWrapper.style.transform.replace(/[^\d.]/g, '') || 1;

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

};

Canvas.zoomWrapper = document.querySelector('.canvas');
Canvas.element = document.querySelector('.objects');
