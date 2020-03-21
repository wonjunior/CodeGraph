'use strict'

class Graph {

  static all = {};
  static id = 1;

  nodeId = 1;

  static generateId() {

    return `g${Graph.id++}`;

  }

  static get(id) {

    return Graph.all[id];

  }

  /**
   *
   * @param {_Element} canvasParent
   */
  constructor(canvasParent) {

    this.id = Graph.generateId();
    this.canvas = new Canvas(canvasParent, this.id);
    this.store = new GraphObjectStore();

    Graph.all[this.id] = this;

  }

  generateNodeId() {

    return this.nodeId++;

  }

  /**
   *
   * @param {Component} component
   */
  add(component) {

		this.register(component.instanciate(this));

  }

  register(graphObject) {

    return this.store.set(graphObject);

  }

  unregister(graphObject) {

    this.store.unset(graphObject);

  }

}