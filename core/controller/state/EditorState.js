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

      '.objects': ({ direction, target }, graph = Graph.get(target.id)) => {
        graph.canvas.zoom.update(direction);
      }

    },

    right: {

      '.objects': ({ event, target }, graph = Graph.get(target.id)) => {
        new Draggable({
          event,  // <?! can we not remove this?
          type: 'drag',
          element: target,
          object: graph.canvas,
          canvasZoom: graph.canvas.zoom,
        });
      },

      // --debug
      '.snap-dock': ({ target }, graph = Graph.get(target.closest('.objects').id)) => {
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

      '.header': ({ target },
                  graph = Graph.get(target.closest('.objects').id),
                  node = graph.store.get('node', target.parentElement.id)) => {
        new Draggable({
          event,
          type: 'drag',
          element: node.element.container,
          object: node.element,
          canvasZoom: graph.canvas.zoom,
          callback: node.update.bind(node),
        });
      },

      '.snap-dock': ({ target }, graph = Graph.get(target.closest('.objects').id)) => {
        new Linkable(event, graph.store.get('dock', target.ref), graph);
      },

      // --debug = links need an exact mouse click on the element, we will need a ghost element
      'path': ({ target }) => {
        _(target.id);
      }

    }

  }

});

State.change(Editor.state.default);