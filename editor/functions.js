/**
  * Miscellaneous functions used throughout the code
  */

// console.log() handy shortcut
const _ = (...a) => console.log(...a);

// determine if a string contains either no characters or only spaces
const isEmpty = str => !str.replace(/\s/g, '').length;

// adds the given function to the JS queue of execution
const wait = fn => setTimeout(() => fn(), 0);
