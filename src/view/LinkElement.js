'use strict'

class LinkElement extends Element {

  static properties = {
    true: { width: 3, stroke: '#4CAF50' },
    false:  { width: 4, stroke: '#3F51B5' },
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

  /**
   *
   * @param {Link} link
   * @param {_Element} parent
   * @param {Boolean} isData
   */
  constructor(link, parent, isData) {

    super(link);

    this.render(parent);

    this.link = link;

    Object.assign(this, LinkElement.properties[isData]);

  }

  /**
   * @overrides Element#create
   */
  create() {

    const $ = Template.link();

    Object.assign(this, {
      container: $('path')
    });

  }

  /**
   * Updates the link's svg representation.
   * @param {Number[2]} position
   */
  update(a, b) {

    this.path = Curve.calculate(a, b);

  }

}