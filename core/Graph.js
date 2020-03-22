'use strict'

class Graph {

  static all = new WeakMap();

  static get(key) {

    return Graph.all.get(key);

  }

  /**
   *
   * @param {_Element} canvasParent
   */
  constructor(canvasParent) {

    this.canvas = new Canvas(canvasParent);
    this.store = new GraphObjectStore();

    Graph.all.set(this.canvas.element.positionWrapper, this);

  }

  /**
   *
   * @param {Component} component
   */
  add(component) {

		/*this.register(*/component.instanciate(this)/*)*/;

  }

  register(graphObject) {

    return this.store.set(graphObject);

  }

  unregister(graphObject) {

    this.store.unset(graphObject);

  }

}