'use strict'

class CanvasElement extends Element {

	get viewportSize() {

    const properties = this.parent.getBoundingClientRect();
    return [ properties.width, properties.height ];

	}

  get zoomLevel() {

    const scaleFromStyle = this.zoomWrapper.style.transform.replace(/[^\d.]/g, '');

    return parseFloat(scaleFromStyle) || 1;

  }

  set zoomLevel(scale) {

    this.zoomWrapper.style.transform = `scale(${scale})`;

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

    _(this.container, 'appended to', parent);
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

  positionFromOrigin()  {

    const properties = this.positionWrapper.getBoundingClientRect();
    return [ properties.x, properties.y ];

  }

  mousePosition(event) {

		const [ x, y ] = [ event.clientX, event.clientY ];
		const [ offsetX, offsetY ] = this.positionFromOrigin();

		return [ (x - offsetX) / this.zoomLevel, (y - offsetY) / this.zoomLevel ];

	}

  boundaryClamp(position) {

    return position.map((value, i) => {

      const minLimit = - this.positionFromOrigin()[i] / this.zoomLevel + this.position[i];
      const maxLimit = minLimit - (this.size[i] - this.viewportSize[i]) / this.zoomLevel;

      return value >= minLimit ? minLimit : (value <= maxLimit ? maxLimit : value);

    });

  }

}