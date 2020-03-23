'use strict'

class ObjectElementMap {

  data = new WeakMap();

  /**
   *
   * @param {Object} key
   * @param {GraphObject} object
   */
  bind(key, object) {

    this.data.set(key, object);

  }

  /**
   *
   * @param {Object} key
   */
  get(key) {

    return this.data.get(key);

  }

}