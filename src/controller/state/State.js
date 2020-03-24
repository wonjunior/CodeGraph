'use strict'

/**
 * Data structure for managing event handler states. Each state bundles a set of keybinds and mousebinds.
 */
class State {

  /**
   * Contains all the states that have been instanciated
   */
  static all = new Map();

  /**
   * Adds a new state that can later be used with `State.change`
   * @param {Object} param defines state's keybinds and mousebinds
   */
  constructor({ id, keybinds = {}, mousebinds = {} }) {

    if (typeof id != 'symbol') throw new Error(`Id must be a symbol, received: ${typeof id} ${id}`);

    State.all.set(id, Object.assign(this, { id, keybinds, mousebinds }));

   }

  /**
   * Changes the state to the one associated with the provided symbol
   * @param {Symbol} symbol the identifier of the state
   * @param {Object} data the object that can be passed to the new state
   */
  static change(symbol, data = {}) {

    if (!State.all.has(symbol)) throw new Error(`The provided id (${symbol}) doesn't exist`);

    $.State.log(`state changed to ${State.all.get(symbol).id.toString()}`)
    State.current = { ...State.all.get(symbol), data };

  }

}