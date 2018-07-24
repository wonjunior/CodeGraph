'use strict'

class Canvas {

    static get zoomLevel() {

        const scaleFromStyle = Canvas.zoomWrapper.style.transform.replace(/[^\d.]/g, '');
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

    /*static zoom(zoomIn, scale) {

        Canvas.updateOrigin();
        Canvas.zoomLevel = scale;

    };

    static updateOrigin() {

        const screenCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const CSSProperty = `${String(screenCenter.x)}px ${String(screenCenter.y)}px`;

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

    };*/

};

Canvas.zoomWrapper = document.querySelector('.canvas');
Canvas.element = document.querySelector('.objects');
