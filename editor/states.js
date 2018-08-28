new State({

    defaultState: true,

    name: 'default',

    keybinds: {

        tab: function(event) {

            /*_('tab change: ', this)
            if (target.classList.contains('varInput')) {

                State.change('inputConstant'); // <? problem here

            }*/

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

            varInput: function(event) {

                this.input = event.target;
                this.dock = dock[ this.input.ref ];

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
