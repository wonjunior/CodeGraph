'use strict'

class CanvasElement extends Element {

	get parentSize() {

    return this.getBoundingClientRect(this.container, 'size');

	}

  get size() {

    return this.getBoundingClientRect(this.positionWrapper, 'size');

  }

  get parentOffset() {

    return this.getBoundingClientRect(this.container, 'position');

  }

  get offset()  {

    return this.getBoundingClientRect(this.positionWrapper, 'position');

  }

  get position() {

    return [ this.positionWrapper.style.left, this.positionWrapper.style.top ].map(parseFloat);

  }

  set position([ x, y ]) {

    Object.assign(this.positionWrapper.style, { left: `${x}px`, top: `${y}px` });

  }

  constructor(parent) {

    super();

    this.render(parent);

  }

  getProperties() {

    return zip(this.position, this.offset, this.parentOffset, this.size, this.parentSize);

  }

  create() {

    const $ = Template.canvas();

    Object.assign(this, {
      container: $('.canvas-wrapper'),
      zoomWrapper: $('.canvas'),
      positionWrapper: $('.objects'),
      nodeArea: $('.nodes'),
      linkArea: $('.links > svg'),
    });

  }

}