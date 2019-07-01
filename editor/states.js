'use strict'

Editor.state = {
	default: Symbol('editorDefaultState'),
	input: Symbol('editorInputState')
}

new State({

    id: Editor.state.default,

    keybinds: {

        spacebar: () => nodeFinder.show(),

        ctrl_shift_spacebar: (event) => _('nope'),

        delete: () => Selection.delete(),

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
					bounderyClamp: Canvas.draggableBoundaryClamp,
				});

			}

		},

        left: {

            '.node-container': ({ target }) => {

				new Selection(Node.all[ target.id ]);
	
			},

			'.header': ({ target }) => {

                const nodeInstance = Node.all[ target.parentElement.id ];
				
				new Draggable({
                    event,
                    type: 'drag',
                    element: nodeInstance.element.node,
					object: nodeInstance,
					bounderyClamp: nodeInstance.draggableBoundaryClamp.bind(nodeInstance),						
                    callback: nodeInstance.update.bind(nodeInstance)
                });

            },

            '.snap-dock': ({ target }) => {

                new Linkable(event, Dock.all[ target.ref ]);

            },

            '.var-input': function(event) {

                this.input = event.target;
                this.dock = Dock.all[ this.input.ref ];

                // this.dock.inputConstant(this.input.value);

                State.change(Editor.state.input, this);

			},

			'path': ({ target }) => {

				_(target.id);

			}

        }

    }

});

State.change(Editor.state.default)

new State({

    id: Editor.state.input,

    keybinds: {

        escape: function() {

            State.change(Editor.state.default);

			this.input.blur();

        },

        other: function() {

            // if (this.input.value) {

                this.dock.inputConstant(this.input.value);

            // }

        },

    },

    mousebinds: {
        all: {
            not: {
                '.var-input': () => State.change(Editor.state.default)
            }
        }
    }

});

/*
else if (event.target.tagName == 'TD') {
const nodeObject = nodeFinder.select(event);
new Draggable({
	event,
	type: 'stick',
	element: nodeObject.element.node,
	object: nodeObject
});
*/