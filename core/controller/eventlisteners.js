'use strict'

// captures all keyboard input on the document
document.addEventListener('keyup', event => {

  new KeyEventHandler(event, State.current);

});

// captures all mouse events (on any mouse button) on the document
document.addEventListener('mousedown', event => {

  new MouseEventHandler(event, State.current);

});

/*Canvas.zoomWrapper.addEventListener('wheel', event => {	// <? move to eventListeners.js

	const newScale = Canvas.zoomLevel + CanvasView.zoomFactor * Math.sign(event.deltaY);

	if (0.5 <= newScale && newScale <= 2) CanvasView.zoom(newScale, event);

});*/

document.addEventListener('wheel', event => {

  new MouseWheelEventHandler(event, State.current);

});