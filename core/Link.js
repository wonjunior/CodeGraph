'use strict'

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
class Link extends GraphObject {

  /**
   * Adds a new link object to the Canvas or edit a link if already exists
   * @param {Dock} startDock the dock from which the link has been pulled
   * @param {Dock || null} endDock a dock instance if second dock is known
   * @param {Graph} graph
   */
  constructor(startDock, endDock, graph) {

    super();

    Object.assign(this, { startDock, endDock, graph });

    if (this.isEditing()) return this.startDock.editLink();

    const flowType = (startDock instanceof DataDock) ? 'data' : 'exe';
    this.element = new LinkElement(this, graph.canvas.element.linkArea, flowType);

    this.startDock.addLink(this);

    if (endDock) this.setEndDock(endDock);

  }

  isEditing() {

    return !this.endDock && this.startDock.isFull();

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
   * Adds the link to the endDock's links, swapping docks if necessary
   */
  pin() {

    this.endDock.popExisting();

    this.endDock.addLink(this);

    if (this.endDock.isRight) this.swapDocks();

    // geh.handle(this);

  }

  /**
   * Remove the link from its endDock's links
   * @returns the link that is edited
   */
  unpin() {

    this.endDock.dropLink(this);

    delete this.endDock;

    return this;

  }

  /**
   * Swaps out startDock and endDock.
   */
  swapDocks() {

    [ this.startDock, this.endDock ] = [ this.endDock, this.startDock ];

  }

  update() {

    this.element.update();

  }

  /**
   * Unregisters the link, deletes the HTML object and unpins from start and end docks.
   */
  destroy() {

    this.element.remove()

    this.startDock.dropLink(this);

    if (this.endDock) this.endDock.dropLink(this);

  }

}