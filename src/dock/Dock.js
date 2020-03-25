'use strict'

/**
 * This class is part of the connection-layer for docks
 */
class Dock extends GraphObject {

  constructor({ label, isRight, isData, location }) {

    super();

    Object.assign(this, { label, isRight, isData });

    const [ flowType, side ] = [ isData ? 'data' : 'exe', isRight ? 'right' : 'left' ];
    this.element = new DockElement(this.constructor.name, location, flowType, side, label);

  }

  isFull() {

    return !(this instanceof OutDataDock) && this.links.size > 0;

  }

  /**
   *
   * @param {Dock} other
   */
  isCompatible(other) {

    return this.node != other.node && this.isRight != other.isRight && this.isData == other.isData;

  }

}