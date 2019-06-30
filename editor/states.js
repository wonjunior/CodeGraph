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

            'node-container': (event) => {

                new Selection(Node.all[ event.target.id ]);

            },

            header: () => {

                const nodeObject = Node.all[ event.target.ref ]; // $nodes
                new Draggable({
                    event,
                    type: 'drag',
                    element: nodeObject.element.node,
					object: nodeObject,
					bounderyClamp: nodeObject.draggableBoundaryClamp.bind(nodeObject),						/* finitepane-rollback */
                    callback:  nodeObject.update.bind(nodeObject)
                });

            },

            'snap-dock': () => {

				const dockObject = Dock.all[ event.target.ref ];
                new Linkable(event, dockObject);

            },

            varInput: function(event) {

                this.input = event.target;
                this.dock = Dock.all[ this.input.ref ];

                // this.dock.inputConstant(this.input.value);

                State.change(Editor.state.input, this);

            },

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

                varInput: () => {

                    State.change(Editor.state.default);

                }

            }

        }

    }

});
