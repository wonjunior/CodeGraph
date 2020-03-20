'use strict'

// Node is the model of a graph node. It uses by default to represent itself visually.
// Node's view class (by default NodeElement) should meet implement the #update and #remove methods.
class Node extends CanvasObject {

  static all = {};

  static idOfLast = 1;
  static idPrefix = 'n';

  /**
   * Depending on the number of nodes already instanciated, the function will create a new node id
   */
  static constructId() {

    return Node.idPrefix + Node.idOfLast++;

  }

  constructor(process, router, canvas, nodeAttributes) {

    super();

    this.id = Node.constructId();
    this.process = process;
    this.router = router || new NullRouter();

    this.bindDocks();
    this.bindRouterToProcess();

    Node.register(this.id, this);

    const dockElements = [...this.docks].map(({element}) => element);
    this.element = new NodeElement(this, dockElements, canvas, nodeAttributes);

  }

  bindRouterToProcess() {

    this.router.process = this.process;

  }

  bindDocks() {

    this.docks = new Set([...this.process.docks, ...this.router.docks]);

    this.process.docks.forEach(dock => dock.process = this.process);
    this.router.docks.forEach(dock => dock.router = this.router);
    this.docks.forEach(dock => dock.node = this);

  }

  /**
   * This method updates all links connected to the node.
   */
  update() {

    this.docks.forEach(dock => dock.update());

  }

  /**
   * This method safely removes the node: destroy docks -> unregister node -> remove node element
   */
  destroy() {

    this.docks.forEach(dock => dock.destroy());

    Node.unregister(this);

    this.element.remove();

  }

  toString() {

    return `${this.constructor.name.substring(1,-1).toLocaleLowerCase()}-node#${this.id}`;

  }

  serialize() { }

}