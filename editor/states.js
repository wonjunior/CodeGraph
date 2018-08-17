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

                _('entering state: inputConstant...', dock[ event.target.ref ]);
                State.change('inputConstant');

            }

        }

    }

});

new State({

    name: 'inputConstant',

    keybinds: {

        other: ({target}) => {

            const dockObject = dock[ event.target.ref ];
            _(dockObject.inputElement.value)
            // dockObject.inputConstant();

        }

    },

    mousebinds: {

        all: {

            not: {

                varInput: () => {

                    _('leaving state');
                    State.change('editor');

                }

            }

        }

    }

});
