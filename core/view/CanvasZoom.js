'use strict'

class CanvasZoom {

  factor = -0.05;

  get level() {

    const scaleFromStyle = this.element.style.transform.replace(/[^\d.]/g, '');

    return parseFloat(scaleFromStyle) || 1;

  }

  set level(scale) {

    this.element.style.transform = `scale(${scale})`;

  }

  /**
   *
   * @param {CanvasElement} canvas
   * @param {_Element} zoomWrapper
   */
  constructor(canvas, zoomWrapper) {

    this.canvas = canvas;
    this.element = zoomWrapper;

  }

  update(direction) {

    const newScale = this.level + this.factor * direction;

    if (0.5 <= newScale && newScale <= 2) this.zoom(newScale);

  }

  zoom(scale) {

    this.updateOrigin();
    this.level = scale;

    this.canvas.recalculatePosition();

  }

  updateOrigin() {

    const CSSProperty = this.canvas.parentSize.map(value => value / 2 + 'px').join(' ');
    this.element.style.transformOrigin = CSSProperty;

  }

}