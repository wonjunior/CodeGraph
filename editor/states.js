new State({

    defaultState: true,

    name: 'default',

    keybinds: {

        tab: function(event) {



        }

    },

    mousebinds: {

        left: {

            header: () => {

                const nodeObject = nodes[ event.target.ref ]; // $nodes
                new Draggable({
                    event,
                    type: 'drag',
                    element: nodeObject.nodeElement,
                    object: nodeObject,
                    callback:  nodeObject.update.bind(nodeObject)
                });

            },

            snapDock: () => {

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

            this.dock.inputConstant(this.input.value);

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
