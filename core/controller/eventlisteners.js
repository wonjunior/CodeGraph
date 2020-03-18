'use strict'

// captures all keyboard input on the document
document.addEventListener('keyup', event => {

  new KeyEventHandler(event, State.current);

});

// captures all mouse events (on any mouse button) on the document
document.addEventListener('mousedown', event => {

  new MouseEventHandler(event, State.current);

});