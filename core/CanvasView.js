'use strict'

class CanvasView {

	zoomFactor = -0.05;

	constructor(element) {	}



	/*zoom(scale, event) {

		CanvasView.updateOrigin(event);

		Canvas.zoomLevel = scale;

		Canvas.position = Canvas.boundaryClamp(Canvas.position);

	}*/

	updateOrigin(event) {

		const position = this.screenSize.map(e => e / 2);

		const CSSProperty = position.map(e => e + 'px').join(' ');

		Canvas.zoomWrapper.style.transformOrigin = CSSProperty;

	}

}

/*Canvas.zoomWrapper.addEventListener('wheel', event => {	// <? move to eventListeners.js

	const newScale = Canvas.zoomLevel + CanvasView.zoomFactor * Math.sign(event.deltaY);

	if (0.5 <= newScale && newScale <= 2) CanvasView.zoom(newScale, event);

});*/