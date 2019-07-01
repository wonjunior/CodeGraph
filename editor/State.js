'use strict'

/**
 * Data structure for managing event handler states. Each state bundles a set of keybinds and mousebinds.
 */
class State {

	/**
	 * Debug mode, whether to show the event logs or not in console
	 */
	static debug = true;

	/**
	 * Contains all the states that have been instanciated
	 */
	static all = {};

	/**
	 * Adds a new state that can later be used with `State.change`
	 * @param {Object} param0 defines state's keybinds and mousebinds
	 */
	constructor({ id, keybinds = {}, mousebinds = {} }) {

		if (typeof id != 'symbol') throw new Error(`Id of state must be a symbol, instead received: ${typeof id} (${id})`);

		Object.assign(this, { id, keybinds, mousebinds });

		State.all[ id ] = this;

 	}

	/**
	 * Returns the state instance associated with the given symbol
	 * @param {Symbol} symbol the symbol mapped to the state
	 */
	static get(symbol) {

		return State.all[ symbol ];

	}

	/**
	 * Changes the state to the one associated with the provided symbol
	 * @param {Symbol} symbol the identifier of the state
	 * @param {Object} data the object that can be passed to the new state
	 */
	static change(symbol, data = {}) {

		const state = State.get(symbol);
		if (!state) throw new Error(`The provided State id (${symbol}) doesn't exist or hasn't been instanciated with \`new State\``);

		State.current = { ...state, data };

	}

}