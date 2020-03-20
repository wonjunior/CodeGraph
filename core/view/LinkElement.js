'use strict'

class LinkElement extends Element {

  static parameters = {
    data: { width: 3, stroke: '#4CAF50' },
    exe: { width: 4, stroke: '#3F51B5' },
  }

  /**
   * Getter/Setter for `LinkElement#stroke` the color of the link.
   */
  get stroke() {

    return this.container.style.stroke;

  }

  set stroke(newStroke) {

    this.container.style.stroke = newStroke;

  }

  /**
   * Getter/Setter for `LinkElement#width`, the stroke size.
   */
  get width() {

    return this.container.style.strokeWidth;

  }

  set width(newWidth) {

    this.container.style.strokeWidth = newWidth;

  }

  /**
   * Getter/Setter for `LinkElement#path`, the path definition of the SVG element.
   */
  get path() {

    return this.container.getAttribute('d');

  }

  set path(newPath) {

    this.container.setAttribute('d', newPath);

  }

  constructor(link, parent) {

    super(link);

    this.render(parent);

    this.link = link;

    Object.assign(this, LinkElement.parameters[this.link.isData ? 'data' : 'exe']);

  }

  /**
     * Creates the link's HTML element. All HTML elements that are needed
   * are saved as HTML objects in the instance.
   */
  create() {

    const $ = Template.link();

    Object.assign(this, {
      container: $('path')
    });

  }

  /**
   * Updates the link's svg representation.
   * @param {Array<Number>} position an array of two numbers
   */
  update(position) {

    if (!position) {

      this.path = Curve.calculate(this.link.startDock.element.position, this.link.endDock.element.position);

    } else if (this.link.startDock.isRight) {

      this.path = Curve.calculate(this.link.startDock.element.position, position);

    } else {

      this.path = Curve.calculate(position, this.link.startDock.element.position);

    }

  }

}