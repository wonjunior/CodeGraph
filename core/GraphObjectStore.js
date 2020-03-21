'use strict'

class GraphObjectStore {

  node = {};
  dock = {};
  link = {};

  /**
   *
   * @param {String} graphObjectType
   * @param {String} id
   */
  get(graphObjectType, id) {

    return this[graphObjectType] ? this[graphObjectType][id] || null : null;

  }

  /**
   *
   * @param {GraphObject} object
   */
  set(object) {

    if (object instanceof Node) return this.node[object.id] = object;
    if (object instanceof Link) return this.link[object.id] = object;
    if (object instanceof Dock) return this.dock[object.id] = object;

  }

  /**
   *
   * @param {GraphObject} object
   */
  unset(object) {

    if (object instanceof Node) delete this.node[object.id];
    if (object instanceof Link) delete this.link[object.id];
    if (object instanceof Dock) delete this.dock[object.id];

  }

}