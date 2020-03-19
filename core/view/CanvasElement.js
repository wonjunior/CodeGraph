'use strict'

class CanvasElement extends Element {

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

    _(this)
    const properties = this.positionWrapper.getBoundingClientRect();
    return [ properties.width, properties.height ];

  }


  // static set size([ x, y ]) {

  // 	// more complex than that: need to check
  // 	//  a) not too small
  // 	//  b) displace all the Canvas' content i.e. re-center the canvas
  // 	Canvas.positionWrapper.style.left = x + 'px';
  // 	Canvas.positionWrapper.style.top = y + 'px';

  // };

  constructor(canvas, parent) {

    super(canvas);

    _(parent, 'appended to', this.container)
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

  boundaryClamp(position) {

    return position.map((value, i) => {

      const minLimit = - [i] / this.zoomLevel + this.position[i];
      const maxLimit = minLimit - (this.size[i] - View.screenSize[i]) / this.zoomLevel;

      return value >= minLimit ? minLimit : (value <= maxLimit ? maxLimit : value);

    });

  }

}