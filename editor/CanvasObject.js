'use strict'

class CanvasObject {

	/**
	 * Gets all values from the `CanvasObject.all` hash.
	 */
	static get values() {

		return Object.values(this.all);

	}

	/**
	 * Adds the object to the corresponding data structure.
	 * @param {String} id the object's unique identifier
	 * @param {CanvasObject} canvasObject the object to register
	 */
	static register(id, canvasObject) {

		this.all[ id ] = canvasObject;

	}

	/**
	 * Removes the object from the data structure holding it.
	 * @param {CanvasObject} canvasObject the object to unregister
	 */
	static unregister(canvasObject) {

		delete this.all[ canvasObject.id ];

	}

}