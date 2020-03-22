'use strict'

class Component {

  /**
   *
   * @param {} nodeKlass a Node class constructor
   * @param {*} properties
   */
  constructor(nodeKlass, properties) {

    this.nodeKlass = nodeKlass;
    this.properties = properties;

  }

  /**
   *
   * @param {Graph} graph
   */
  instanciate(graph) {

    return new this.nodeKlass(graph, this.properties);

  }

}