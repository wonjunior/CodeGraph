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

      '.objects': ({ direction, target }, graph = Graph.get(target)) => {
        graph.canvas.zoom.update(direction);
      }

    },

    right: {

      '.objects': ({ event, target }, graph = Graph.get(target)) => {
        new Draggable({
          event,  // <?! can we not remove this?
          type: 'drag',
          element: target,
          object: graph.canvas,
          canvasZoom: graph.canvas.zoom,
        });
      },

      // --debug
      '.snap-dock': ({ target },
                     graph = Graph.get(target),
                     dock = graph.store.get(target)) => {
        window.$DOCK = dock;
      },

    },

    left: {

      '.node-container': ({ target }) => {
        target.classList.toggle('selected')
      },

      '.header': ({ target },
                  graph = Graph.get(target),
                  node = graph.store.get(target)) => {
        new Draggable({
          event,
          type: 'drag',
          element: node.element.container,
          object: node.element,
          canvasZoom: graph.canvas.zoom,
          callback: node.update.bind(node),
        });
      },

      '.snap-dock': ({ target }, graph = Graph.get(target)) => {
        new Linkable(event, graph.store.get(target), graph);
      },

      // --debug = links need an exact mouse click on the element, we will need a ghost element
      'path': ({ target }) => {
        _(target.id);
      }

    }

  }

});

State.change(Editor.state.default);