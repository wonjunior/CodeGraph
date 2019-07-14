'use strict'

class Element {

	constructor(objectInstance, parent, parameters) {

		this.parent = parent;

		this.create(objectInstance);
		
		this.setProperties(parameters);

	}

	/**
	 * Adds the given parameters to the instance's properties.
	 * @param {Object} parameters the properties added to the instance
	 */
	setProperties(parameters) {

		Object.assign(this, parameters);

	}

	/**
	 * Renders the element in the parent element.
	 */
	render() {

		this.parent.appendChild(this.container);

	}

	remove() {

		this.container.remove();

	}

	/**
	 * Creates a listener on the provided property of the object instance by creating a new get/set property.
	 * @param {Object} object the object to add the property onto
	 * @param {String} property the object's property to observe
	 * @param {Function} callback the function to execute when the property changes
	 */
	defineProperty(object, property, callback) {

		let _val = object[property];

		Object.defineProperty(object, property, {

			enumerable: true,

			get: () => _val,

			set: val => {

				callback.bind(this)(val);

				_val = val;

			}

		});

		object[property] = _val;
			
	}

	observe(object) {

		Object.entries(this.callbacks).map( ([ property, callback ]) => this.defineProperty(object, property, callback) );

	}

}