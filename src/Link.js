'use strict'

/**
 * Represent a link object used to connect two nodes together
 * Edited links (those that don't yet have an end dock are not registered in `Links`)
 */
class Link extends GraphObject {

  static get(start, graph) {

    return start.occupied ? start.editLink() : new Link(start, null, graph);

  }

  get flowType() {

    return this.start.isData;

  }

  /**
   * Adds a new link object to the Canvas or edit a link if already exists
   * @param {Dock} start the dock from which the link has been pulled
   * @param {Dock || null} end a dock instance if second dock is known
   * @param {Graph} graph
   */
  constructor(start, end, graph) {

    super();

    Object.assign(this, { start, end, graph });

    this.element = new LinkElement(this, graph.canvas.element.linkArea, start.isData);

    this.start.addLink(this);

    if (end) this.setEndDock(end);

  }

  isCompatible(dock) {

    return this.start.isCompatible(dock);

  }

  /**
   * Check if end is compatible with link then save the link on the dock.
   * @param {Dock} end
   */
  setEndDock(end) {

    if (!this.isCompatible(end)) this.destroy();

    this.pin(end);

    this.update();

  }

  /**
   * Adds the link to the endDock's links, swapping docks if necessary
   */
  pin(end) {

    this.end = end;

    this.end.popExisting().addLink(this);

    if (this.end.isRight) this.swapDocks();

    this.graph.eventHandler.handle(this);

  }

  /**
   * Remove the link from its endDock's links
   * @returns the link that is edited
   */
  unpin() {

    this.end.dropLink(this);

    delete this.end;

    return this;

  }

  swapDocks() {

    [ this.start, this.end ] = [ this.end, this.start ];

  }

  update(position) {

    if (!position) return this.element.update(this.start.element.position, this.end.element.position);

    return this.start.isRight
      ? this.element.update(this.start.element.position, position)
      : this.element.update(position, this.start.element.position)
    ;

  }

  /**
   * Unregisters the link, deletes the HTML object and unpins from start and end docks.
   */
  destroy() {

    this.element.remove();

    this.start.dropLink(this);

    if (this.end) this.end.dropLink(this);

  }

  trigger(payload) {

    this.end.trigger(payload);

  }

  getOrigin() {

    return this.start;

  }

}