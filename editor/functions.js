/**
  * Miscellaneous functions used throughout the code
  */

// console.log handy shortcut
const _ = (...a) => console.log(...a);

// console.table handy shortcut
const __ = (a) => console.table(a);

// determine if a string contains either no characters or only spaces
const isEmpty = str => !str.replace(/\s/g, '').length;

// adds the given function to the JS queue of execution
const wait = fn => setTimeout(fn, 0);

// quick sugar getter to retrieve first element or Array
Object.defineProperty(Array.prototype, 'first', {
	get: function() {
    	return this[0];
    },
	set: function(e) {
		this[0] = e;
	}
});

Object.defineProperty(Object.prototype, 'select', {
	/**
	 * reduces an object to the provided keys
	 * @param  {...any} keys the keys to pick from the object
	 */
	value: function(...keys) {
		return Object.entries(this)
			.filter(([key, value]) => ~keys.indexOf(key))
			.reduce((projected, [key, value]) => ({ ...projected, [key]: value }), {});
	}
});

const _Element = Element;
const _Node = Node;