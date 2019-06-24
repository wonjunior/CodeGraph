'use strict'

class View {

    static get screenSize() {

        return [ window.innerWidth, window.innerHeight ];

    };

    static zoom(scale, event) {

        View.updateOrigin(event);

        Canvas.zoomLevel = scale;

        Canvas.position = Canvas.draggableBoundaryClamp(Canvas.position);												/* finitepane-rollback */

    };

    static updateOrigin(event) {

        const position = View.screenSize.map(e => e / 2);

        const CSSProperty = position.map(e => e + 'px').join(' ');

		// const [ mouseX, mouseY ] = this.mousePosition(event);
        // const CSSProperty = `${String(mouseX)}px ${String(mouseY)}px`;

        Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

    };

    static mousePosition(event) {

        const [ x, y ] = [ event.clientX, event.clientY ];
        const [ offsetX, offsetY ] = Canvas.positionFromOrigin();

        return [ (x - offsetX) / Canvas.zoomLevel, (y - offsetY) / Canvas.zoomLevel ];

    };

};

View.zoomFactor = -0.05;

Canvas.zoomWrapper.addEventListener('wheel', event => {																	/* finitepane-rollback */

    const sign = Math.sign(event.deltaY);

	const newScale = Canvas.zoomLevel + View.zoomFactor * sign;															/* finitepane-rollback */

	if (0.5 <= newScale && newScale <= 2) {																			/* finitepane-rollback */

		View.zoom(newScale, event);																							/* finitepane-rollback */

	}

});
