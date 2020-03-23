'use strict'

/**
 * Handles the dragging behavior of links in UI. Anytime the user is interacting with a link
 * a new instance of this class is created and takes care of initiating and closing mouse events.
 */
class Linkable {

  /**
   * {Dock} the dock on which the link is snapped
   */
  snapped = null;

  /**
   * Creates a new event handler for the linking behavior and initiates the mouse event listeners.
   * @param {MouseEvent} event the event that triggered Linkable
   * @param {Dock} startDock the dock from which the event is initiated
   * @param {Graph} graph
   */
  constructor(event, startDock, graph) {

    this.link = Link.get(startDock, graph);
    this.graph = graph;

    this.mouseMove(event);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp, { once: true });

  }

  /**
   * {Event callback} Executed when mouse moves.
   */
  mouseMove = e => {

    this.insideSnapArea(e) ? this.mouseIn(e) : this.mouseOut(e);

  }

  /**
   * {Event callback} Executed when mouse is moving inside a snap area.
   */
  mouseIn(e) {

    if (!this.snapped) this.mouseEnter(e);

  }

  /**
   * {Event callback} Executed when mouse is moving outside a snap area.
   */
  mouseOut(e) {

    if (this.snapped) this.mouseLeave(e);

    this.trackMouse(e);

  }

  /**
   * {Event callback} Executed when mouse is entering a snap area.
   */
  mouseEnter(e, dock = e.target) {

    const endDock = this.graph.store.get(dock);
    this.canSnap(endDock) ? this.snap(endDock) : this.trackMouse(e);

  }

  /**
   * {Event callback} Executed when mouse is leaving a snap area.
   */
  mouseLeave(e) {

    this.snapped = null;

  }

  /**
   * {Event callback} Executed when mouse button gets released.
   */
  mouseUp = () => {

    this.snapped ? this.mouseUpIn() : this.mouseUpOut();

    document.removeEventListener('mousemove', this.mouseMove);

  }

  /**
   * {Event callback} Executed when mouse is released and link is snapped.
   */
  mouseUpIn(dock) {

    this.link.pin(this.snapped);

  }

  /**
   * {Event callback} Executed when mouse up is released outside of a snap area.
   */
  mouseUpOut() {

    this.link.destroy();

  }

  /**
   * Returns true if the mouse is located on a snap area.
   * @param {MouseEvent} event
   */
  insideSnapArea(event) {

    return event.target.matches('.snap-dock');

  }

  /**
   * Updates the position of the link's end dock with the mouse's position.
   * @param {MouseEvent} event triggered by "mousemove"
   */
  trackMouse(event) {

    this.link.update(this.graph.canvas.mousePosition(event));

  }

  /**
   * Returns whether the link can snap on the given dock or not.
   * @param {Dock} dock against which we're testing the link's compatibility
   */
  canSnap(dock) {

    return this.link.isCompatible(dock);

  }

  /**
   * Snaps the link to the dock given as argument.
   * @param {Dock} dock
   */
  snap(dock) {

    this.snapped = dock;

    this.link.update(dock.element.position);

  }

}