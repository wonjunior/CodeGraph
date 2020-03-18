'use strict'

Editor.state = {
  default: Symbol('editorDefaultState'),
}

new State({

  id: Editor.state.default,

  keybinds: {

    spacebar: () => nodeFinder.show(),

    ctrl_shift_spacebar: (event) => _('nope'),

    tab: function(e) { e.preventDefault() }

  },

  mousebinds: {

    right: {

      '.objects': ({ event, target }) => {
        new Draggable({
          event,
          type: 'drag',
          element: target,
          object: Canvas,
        });
      },

      // --debug
      '.snap-dock': () => {
        event.path.some(e => {
          if (e.classList && e.classList.contains('dock-container'))
            window.$DOCK = Dock.all[e.id];
        });
      },

    },

    left: {

      '.node-container': ({ target }) => {
        target.classList.toggle('selected')
      },

      '.header': ({ target }, node = Node.all[ target.parentElement.id ]) => {
        new Draggable({
          event,
          type: 'drag',
          element: node.element.container,
          object: node.element,
          callback: node.update.bind(node)
        });
      },

      '.snap-dock': ({ target }) => {
        new Linkable(event, Dock.all[ target.ref ]);
      },

      // --debug = links need an exact mouse click on the element, we will need a ghost element
      'path': ({ target }) => {
        _(target.id);
      }

    }

  }

});

State.change(Editor.state.default);