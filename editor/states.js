new State({

    defaultState: true,

    name: 'default',

    keybinds: {

        tab: ({ target }) => {

            if (target.classList.contains('varInput')) {

                State.change('inputConstant');

            }

        }

    },

    mousebinds: {

        left: {

            header: () => {

                const nodeObject = node[ event.target.ref ];
                new Draggable({
                    event,
                    type: 'drag',
                    element: nodeObject.nodeElement,
                    object: nodeObject,
                    callback:  nodeObject.update.bind(nodeObject)
                });

            },

            snapDock: () => {

                const dockObject = dock[ event.target.ref ];
                new Linkable(event, dockObject);

            },

            varInput: () => {

                State.change('inputConstant');

            }

        }

    }

});

new State({

    name: 'inputConstant',

    keybinds: {

        escape: function() {

            if (this.dock) _(this.dock)

        },

        other: function({target}) {

            this.dock = dock[ event.target.ref ];
            this.dock.inputConstant(event.target.value);

        }

    },

    mousebinds: {

        all: {

            not: {

                varInput: () => {

                    State.change('editor');

                }

            }

        }

    }

});
