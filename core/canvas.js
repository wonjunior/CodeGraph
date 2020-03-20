'use strict'

class Canvas {

  set position(position) {

    this.element.position = this.boundaryClamp(position);

  }

	constructor(parent) {

		this.element = new CanvasElement(parent);
    this.zoom = new CanvasZoom(this, this.element.zoomWrapper);

	}

	recalculatePosition() {

    this.position = this.element.position;

  }

  mousePosition(event) {

		const [ x, y ] = [ event.clientX, event.clientY ];
		const [ offsetX, offsetY ] = this.element.offset;

		return [ (x - offsetX) / this.zoom.level, (y - offsetY) / this.zoom.level ];

  }

  getLimitValues() {

    return this.element.getProperties().map(([pos, offset, parentOffset, size, parentSize]) => {

      const maxValue = (parentOffset - offset) / this.zoom.level + pos;
      const minValue = maxValue + (parentSize - size) / this.zoom.level;
      return [ minValue, maxValue ];

    });

  }

  boundaryClamp(position) {

    return zip(position, this.getLimitValues()).map(([value, limits]) => clamp(value, ...limits));

  }

}

const $CANVAS = new Canvas(document.querySelector('.window'));