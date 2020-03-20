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

    wheel: {

      '.objects': ({ direction, selector, target }) => {

        // we need to access the current Canvas w/ selector/target -> canvas need ids!
        // same for the CanvasView where are we?
        // $.Event.log(selection, target, direction);
        $CANVAS.zoom.update(direction);

      }

    },

    right: {

      '.objects': ({ event, target }) => {
        new Draggable({
          event,
          type: 'drag',
          element: target,
          object: $CANVAS,
          canvasZoom: $CANVAS.zoom,
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
          canvasZoom: $CANVAS.zoom,
          callback: node.update.bind(node),
        });
      },

      '.snap-dock': ({ target }) => {
        new Linkable(event, Dock.all[ target.ref ], $CANVAS);
      },

      // --debug = links need an exact mouse click on the element, we will need a ghost element
      'path': ({ target }) => {
        _(target.id);
      }

    }

  }

});

State.change(Editor.state.default);