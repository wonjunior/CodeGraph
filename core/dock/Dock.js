'use strict'

class Dock extends CanvasObject {

  static all = {};

  constructor({ id, label, isRight, location }) {

    super();

    Dock.register(id, this);

    Object.assign(this, {
      id,
      label,
      isRight,
      location,
      links: [],
      occupied: false,
      label: label || id
    });

    this.element = new DockElement(this, location, {label});

  }

  update() {

    this.links.forEach(link => link.update());

  }

  destroy() {

    this.links.forEach(link => link.destroy());

    Dock.unregister(this);

  }

  /**
   * Right-sided data docks are never occupied
   */
  allowsMultipleLinks() {

    return this.isRight && this instanceof DataDock;

  }

  occupiedAndUnique() {

    return this.occupied && !this.allowsMultipleLinks();

  }

  getLink() {

    return this.occupiedAndUnique() ? this.links.first.edit() : new Link(this);

  }

  isCompatible(dock) {

    const notEqual = (this.node != dock.node);
    const opposite = (this.isRight != dock.isRight);
    const sameType = (this instanceof DataDock == dock instanceof DataDock) && (this.type == dock.type);

    return notEqual && opposite && sameType;

  }

  dropLink(link) {

    this.links = link ? this.links.filter(({ id }) => id !== link.id) : [];
    this.occupied = !!this.links.length;

  }

  addLink(link) {

    this.links.push(link);
    this.occupied = true;

  }

  /**
   * Destroys the link if there is any that's occupying the dock
   */
  popExistingLink() {

    if (this.occupiedAndUnique()) this.links.first.destroy();

  }

  toString() {

    return `${this.constructor.name}#${this.id}`;

  }

  serialize() { }

}