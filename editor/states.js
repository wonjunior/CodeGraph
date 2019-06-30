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

            '.varInput': function(event) {

                this.input = event.target;
                this.dock = Dock.all[ this.input.ref ];

                // this.dock.inputConstant(this.input.value);

                State.change(Editor.state.input, this);

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
                '.varInput': () => State.change(Editor.state.default)
            }
        }
    }

});
