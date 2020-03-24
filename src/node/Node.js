'use strict'

// Node is the model of a graph node. It uses by default to represent itself visually.
// Node's view class (by default NodeElement) should meet implement the #update and #remove methods.
class Node extends GraphObject {

  constructor(process, router, graph, nodeAttributes) {

    super();

    this.graph = graph;
    this.process = process;
    this.router = router || new NullRouter();
    this.router.process = this.process;

    this.bindDocks();

    const dockElements = [...this.docks].map(({element}) => element);
    this.element = new NodeElement(dockElements, graph.canvas, nodeAttributes);
    this.graph.store.bind(this.element.header, this);

  }

  bindDocks() {

    this.docks = new Set([...this.process.docks, ...this.router.docks]);
    this.docks.forEach(dock => this.graph.store.bind(dock.element.snap, dock));
    this.docks.forEach(dock => dock.node = this);

    this.process.docks.forEach(dock => dock.process = this.process);
    this.router.docks.forEach(dock => dock.router = this.router);

  }

  /**
   * This method updates all links connected to the node.
   */
  update() {

    this.docks.forEach(dock => dock.update());

  }

  destroy() {

    this.docks.forEach(dock => dock.destroy());

    this.graph.unregister(this);

    this.element.remove();

  }

}