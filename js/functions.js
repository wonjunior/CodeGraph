/**
  * Miscellaneous functions used throughout the code
  */

// console.log() handy shortcut
let _ = (a) => { console.log(a) }

// determine if a string contains either no characters or only spaces
let isEmpty = (str) => !str.replace(/\s/g, '').length;

// adds the given function to the JS queue of execution
let wait = (fn) => { setTimeout(() => fn(), 0) }
