new State({

    defaultState: true,

    name: 'default',

    keybinds: {

        tab: function(event) {



        }

    },

    mousebinds: {


        left: {

            container: (event) => {

                new Selection(nodes[ event.target.id ]);

            },

            header: () => {

                const nodeObject = nodes[ event.target.ref ]; // $nodes
                new Draggable({
                    event,
                    type: 'drag',
                    element: nodeObject.element.node,
                    object: nodeObject,
                    callback:  nodeObject.update.bind(nodeObject)
                });

            },

            'snap-dock': () => {

                const dockObject = docks[ event.target.ref ];
                new Linkable(event, dockObject);

            },

            varInput: function(event) {

                this.input = event.target;
                this.dock = docks[ this.input.ref ];

                // this.dock.inputConstant(this.input.value);

                State.change('inputConstant', this);

            },

        }

    }

});

new State({

    name: 'inputConstant',

    keybinds: {

        escape: function() {

            State.change('editor');

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

                    State.change('editor');

                }

            }

        }

    }

});
