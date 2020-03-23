'use strict'

/**
 * connection layer for all docks
 */
class Dock extends GraphObject {

  links = new Set();

  constructor({ label, isRight, location }) {

    super();

    Object.assign(this, { label, isRight });

    const flowType = (this instanceof DataDock) ? 'data' : 'exe';
    const side = isRight ? 'right' : 'left';
    this.element = new DockElement(this.constructor.name, location, flowType, side, label);

  }

  isFull() {

    return !(this instanceof OutDataDock) && this.links.size > 0;

  }

  update() {

    this.links.forEach(link => link.update());

  }

  destroy() {

    this.links.forEach(link => link.destroy());

  }

  isCompatible(dock) {

    const notEqual = (this.node != dock.node);
    const opposite = (this.isRight != dock.isRight);
    const sameType = (this instanceof DataDock == dock instanceof DataDock);

    return notEqual && opposite && sameType;

  }

  dropLink(link) {

    this.links.delete(link);

  }

  addLink(link) {

    this.links.add(link);

  }

  /**
   * Destroys the link if there is any that's occupying the dock
   */
  popExisting() {

    if (this.isFull()) this.destroy();

  }

  /**
   * Must be called on something other than an OutDataDock
   */
  editLink() {

    return [...this.links][0].unpin();

  }

}