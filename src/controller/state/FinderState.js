'use strict'

Finder.state = Symbol('finder');

new State({

  id: Finder.state,

  keybinds: {
    'escape': () => nodeFinder.hide(),
    'alphabet': event => nodeFinder.search(event.target.value),
  },

  mousebinds: {
    all: {
      not: {
        '.search-container': () => nodeFinder.hide()
      }
    }
  }

});
