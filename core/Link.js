'use strict'

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
class Link extends CanvasObject {

  static all = {};

  static separator = '-';

  /**
   * Adds a new link object to the Canvas or edit a link if already exists
   * @param {Dock} startDock the dock from where the link has been pulled
   * @param {Dock || undefined} endDock a dock instance if the second dock is already known, else `undefined`
   */
  constructor(startDock, endDock) {

    super();

    this.startDock = startDock;
    this.isData = startDock instanceof DataDock;

    if (startDock.occupiedAndUnique()) {

      const link = this.editExistingLink(endDock);
      if (link) return link;

    }

    this.element = new LinkElement(this, Canvas.linkArea);

    this.id = startDock.id;

    this.startDock.addLink(this);

    if (endDock) this.setEndDock(endDock);

    }

  /**
   * Constructs an unique string to identify the link.
   * @returns {String} the link's id
   */
  constructId() {

    return this.startDock.id + Link.separator + this.endDock.id;

  }

  update() {

    this.element.update();

  }

  /**
   * Deletes the existing link if the provided endDock is defined, else return this link.
   * @param {Dock} endDock
   */
  editExistingLink(endDock) {

    const link = this.unpinExistingLink();

    return endDock ? link.destroy() : link;

  }

  /**
   * Returns the existing link hosted by the link's startDock.
   */
  unpinExistingLink() {

    return this.startDock.links.first.unpin();

  }

  /**
   * Check if endDock is compatible with link then save the link on the dock.
   * @param {Dock} endDock
   */
  setEndDock(endDock) {

    if (!this.startDock.isCompatible(endDock)) this.destroy();

    this.endDock = endDock;

    this.pin();

    this.element.update();

  }

  /**
   * Remove the link from its endDock's links, unregister the link then return it.
   * @returns the link that is edited
   */
  unpin() {

    Link.unregister(this);

    this.endDock.dropLink(this);

    delete this.endDock;

    return this;

  }

  /**
   * Adds the link to the endDock's links, swap docks if necessary and register it.
   */
  pin() {

    $.Linkable.log(`(1) popping existing links on ${this.endDock}`);
    this.endDock.popExistingLink();

    this.endDock.addLink(this);

    if (this.endDock.isRight) this.swapDocks();

    this.id = this.constructId();

    $.Linkable.log(`(2) registering new link with id=${this.id}`);
    Link.register(this.constructId(), this);

    geh.handle(this);

  }

  /**
   * Swaps out startDock and endDock.
   */
  swapDocks() {

    [ this.startDock, this.endDock ] = [ this.endDock, this.startDock ];

  }

  /**
   * Unregisters the link, deletes the HTML object and unpins from start and end docks.
   */
  destroy() {

    Link.unregister(this);

    this.element.remove()

    this.startDock.dropLink(this);

    if (this.endDock) this.endDock.dropLink(this);

  }

  /**
   * Update all of registered links.
   */
  static update() {

    Link.values.forEach(link => link.element.update());

  }

  serialize() {}

}