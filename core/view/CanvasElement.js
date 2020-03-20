'use strict'

class CanvasElement extends Element {

	get parentSize() {

    const properties = this.parent.getBoundingClientRect();
    return [ properties.width, properties.height ];

	}

  get position() {

    return [ this.positionWrapper.style.left, this.positionWrapper.style.top ].map(parseFloat);

  }

  set position(position) {

    const [ x, y ] = this.boundaryClamp(position);
    Object.assign(this.positionWrapper.style, { left: `${x}px`, top: `${y}px` });

  }

  get size() {

    const properties = this.positionWrapper.getBoundingClientRect();
    return [ properties.width, properties.height ];

  }

  constructor(canvas, parent) {

    super(canvas);
    this.parent = parent;
    this.zoom = new CanvasZoom(this, this.zoomWrapper);

    this.render(parent);

  }

  create(canvas) {

    const $ = Template.canvas();

    Object.assign(this, {
      container: $('.canvas'),
      zoomWrapper: $('.canvas'),
      positionWrapper: $('.objects'),
      nodeArea: $('.nodes'),
      linkArea: $('.links > svg'),
    });

  }

  recalculatePosition() {

    this.position = this.position;

  }

  parentPositionFromOrigin() {

    const properties = this.parent.getBoundingClientRect();
    return [ properties.x, properties.y ];

  }

  positionFromOrigin()  {

    const properties = this.positionWrapper.getBoundingClientRect();
    return [ properties.x, properties.y ];

  }

  mousePosition(event) {

		const [ x, y ] = [ event.clientX, event.clientY ];
		const [ offsetX, offsetY ] = this.positionFromOrigin();

		return [ (x - offsetX) / this.zoom.level, (y - offsetY) / this.zoom.level ];

	}

  boundaryClamp(position) {

    return position.map((value, i) => {

      const minLimit = (this.parentPositionFromOrigin()[i] - this.positionFromOrigin()[i]) / this.zoom.level + this.position[i];
      const maxLimit = minLimit - (this.size[i] - this.parentSize[i]) / this.zoom.level;

      return value >= minLimit ? minLimit : (value <= maxLimit ? maxLimit : value);

    });

  }

}