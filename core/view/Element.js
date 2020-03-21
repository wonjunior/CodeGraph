'use strict'

class Element {

  constructor(args) {

    // #create must be implemented by child class
    this.create(args);

  }

  /**
   * Renders the container element in the parent element.
   */
  render(parent) {

    parent.appendChild(this.container);

  }

  remove() {

    this.container.remove();

  }

  getBoundingClientRect(element, property) {

    const { width, height, x, y } = element.getBoundingClientRect();

    switch (property) {
      case 'size': return [ width, height ];
      case 'position': return [ x, y ];
      default: return [NaN, NaN];
    }

  }

}