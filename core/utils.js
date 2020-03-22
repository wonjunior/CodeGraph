'use strict'

/**
  * Utility functions
  */

// console.log handy shortcut
const _ = (...a) => console.log(...a);

// console.table handy shortcut
const __ = (a) => console.table(a);

// determines if a string contains either no characters or only spaces
const isEmpty = str => !str.replace(/\s/g, '').length;

// adds the given function to the JS queue of execution
const wait = fn => setTimeout(fn, 0);

// space characters string generator
const space = n => new Array(n).fill(' ').join('');

// converts a random double into base 36 (numbers + letters), and grabs the first 4 characters
const uniqueId = () => Math.random().toString(36).substr(2, 4);

// zip function
const zip = (...arrays) => arrays[0].map((_,i) => arrays.map(array => array[i]));

// clamp function
const clamp = (x, min, max) => x > max ? max : (x < min ? min : x);

// capitalize first letter of string
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// converts integer to alphabetic character
const abc = i => [
  'a','b','c','d','e','f','g','h', 'i','j', 'k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z'
][i%26];

// quick sugar getter to retrieve first element of an Array
Object.defineProperty(Array.prototype, 'first', {
  get: function() {
    return this[0];
  },
  set: function(e) {
    this[0] = e;
  }
});