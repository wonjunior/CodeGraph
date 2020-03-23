'use strict'

class Graph {

  static all = new WeakMap();

  static get(key) {

    return Graph.all.get(key) || Graph.all.get(CanvasElement.closestCanvas(key));

  }

  nodes = new Set();
  store = new ObjectElementMap();

  /**
   *
   * @param {_Element} canvasParent
   */
  constructor(canvasParent) {

    this.canvas = new Canvas(canvasParent);

    Graph.all.set(this.canvas.element.positionWrapper, this);

  }

  /**
   *
   * @param {Component} component
   */
  add(component) {

		return this.register(component.instanciate(this));

  }

  register(node) {

    return this.nodes.add(node) && node;

  }

  unregister(node) {

    this.nodes.delete(node);

  }

}