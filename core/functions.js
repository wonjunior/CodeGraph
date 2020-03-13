'use strict'

const DEBUG = true;

/**
  * Miscellaneous functions used throughout the code
  */

// console.log handy shortcut
const _ = (...a) => console.log(...a);

// console.log on debug mode with indentation with tree-like structure
const $_ = ((head = '') => ({
  indent:  () => head += '  ',
  pipe: () => head += ' |',
  unindent: () => head = head.slice(0,-2),
  newline: DEBUG ? () => console.log('') : () => {},
  log: DEBUG ? (...a) => console.log('(DEBUG)', head, ...a) : () => {}
}))();

// console.table handy shortcut
const __ = (a) => console.table(a);

// determine if a string contains either no characters or only spaces
const isEmpty = str => !str.replace(/\s/g, '').length;

// adds the given function to the JS queue of execution
const wait = fn => setTimeout(fn, 0);

// converts a random double into base 36 (numbers + letters), and grabs the first 4 characters
const uniqueId = () => Math.random().toString(36).substr(2, 4);

// zip function
const zip = (...arrays) => arrays[0].map((_,i) => arrays.map(array => array[i]));

// converts integer to alphabetic character
const abc = i => [
  'z','a','b','c','d','e','f','g','h', 'i','j', 'k','l',
  'm','n','o','p','q','r','s','t','u','v','w','x','y'
][i%26];

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