'use strict'

class Element {

  constructor(objectInstance){//, parent) {

    // this.parent = parent;

    // #create must be implemented by child class
    this.create(objectInstance);

    // this.render();

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