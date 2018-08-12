'use strict'

class View {

    static get screenSize() {

        return [ window.innerWidth, window.innerHeight ];

    };

    static zoom(scale) {

        View.updateOrigin();

        Canvas.zoomLevel = scale;

    };

    static updateOrigin() {

        const screenCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const CSSProperty = `${String(screenCenter.x)}px ${String(screenCenter.y)}px`;

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

    };

    static mousePosition(event) {

        const [ x, y ] = [ event.clientX, event.clientY ];
        const [ offsetX, offsetY ] = Canvas.positionFromOrigin();

        return [ (x - offsetX) / Canvas.zoomLevel, (y - offsetY) / Canvas.zoomLevel ];

    };

};

View.zoomFactor = -0.1;

Canvas.zoomWrapper.addEventListener('wheel', event => {

    const sign = Math.sign(
        event.deltaY
    );

    const newScale = Canvas.zoomLevel + View.zoomFactor * sign;

    if (0.5 <= newScale && newScale <= 2) { // <? min scale is fct(Canvas.size, View.screenSize)

        View.zoom(newScale);

    }

});
