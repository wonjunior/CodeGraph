'use strict'

class Canvas {	 // <? extends there #size and #position!

	constructor(parent) {

		this.element = new CanvasElement(this, parent);

	}

};

const $CANVAS = new Canvas(document.querySelector('.window'));