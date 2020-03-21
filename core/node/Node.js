'use strict'

// Node is the model of a graph node. It uses by default to represent itself visually.
// Node's view class (by default NodeElement) should meet implement the #update and #remove methods.
class Node extends GraphObject {

  static generateId(graph) {

    return `${graph.id}-n${graph.generateNodeId()}`;

  }

  constructor(process, router, graph, nodeAttributes) {

    super();

    this.id = Node.generateId(graph);
    this.graph = graph;
    this.process = process;
    this.router = router || new NullRouter();
    this.router.process = this.process;

    this.bindDocks();

    const dockElements = [...this.docks].map(({element}) => element);
    this.element = new NodeElement(this, dockElements, graph.canvas, nodeAttributes);

  }

  bindDocks() {

    this.docks = new Set([...this.process.docks, ...this.router.docks]);
    this.docks.forEach(dock => this.graph.register(dock));

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

    this.graph.unregister(this);

    this.element.remove();

  }

  toString() {

    return `${this.constructor.name.substring(1,-1).toLocaleLowerCase()}-node#${this.id}`;

  }

  serialize() { }

}