'use strict'

class View {

    static get screenSize() {

        return [ window.innerWidth, window.innerHeight ];

    };

    static zoom(scale, position) {

        View.updateOrigin(position);

        Canvas.zoomLevel = scale;

        Canvas.position = Canvas.draggableBoundaryClamp(Canvas.position);												/* finitepane-rollback */

    };

    static updateOrigin(position) {

        position = position ? position : View.screenSize.map(e => e / 2);

        const CSSProperty = position.map(e => e + 'px').join(' ');

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

        /*const screenCenter = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        const CSSProperty = `${String(screenCenter.x)}px ${String(screenCenter.y)}px`; // <? use View.screenSize()

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;*/

    };

    static mousePosition(event) {

        const [ x, y ] = [ event.clientX, event.clientY ];
        const [ offsetX, offsetY ] = Canvas.positionFromOrigin();
        // const [ offsetX, offsetY ] = Canvas.position;																	/* finitepane-rollback */

        return [ (x - offsetX) / Canvas.zoomLevel, (y - offsetY) / Canvas.zoomLevel ];

    };

};

View.zoomFactor = -0.05;

Canvas.zoomWrapper.addEventListener('wheel', event => {																	/* finitepane-rollback */

    const sign = Math.sign(
        event.deltaY
    );

	const newScale = Canvas.zoomLevel + View.zoomFactor * sign;															/* finitepane-rollback */

	if (0.5 <= newScale &&  newScale <= 2) {																			/* finitepane-rollback */

		View.zoom(newScale);																							/* finitepane-rollback */

	}
	
	/************************* finitepane-rollback **********************************/
	// let newScale;
    // if (Canvas.zoomLevel < 1) {

        // newScale = 1 / (1 / Canvas.zoomLevel - 2 * View.zoomFactor * sign);

    // } else {

        // newScale = Canvas.zoomLevel + View.zoomFactor * sign;

    // }

    // View.zoom(newScale, /*[event.clientX, event.clientY]*/);


    /*const newScale = Canvas.zoomLevel + View.zoomFactor * sign;
    if (newScale > 0) {

        View.zoom(newScale);

    }*/

});
