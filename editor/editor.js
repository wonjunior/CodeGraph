'use strict'

class Editor {

    static save() {

        const saved = {};

        saved.node = Object.entries(node).map(([ nodeId, node ]) => {

            return Node.destruct(node);

        });

        saved.link = Object.entries(link).map(([ linkId, _link ]) => {

            return Link.destruct(_link);

        });

        saved.Canvas = (function({position, zoomLevel}) {

            return { position, zoomLevel };

        })(Canvas);

        return JSON.stringify(saved);

    };

    static load(dataString) {

        const data = JSON.parse(dataString);

        data.node.forEach(nodeObject => {

            new Node(nodeObject);

        });

        data.link.forEach(linkObject => {

            new Link();

        });

        Canvas.position = data.Canvas.position;
        Canvas.zoomLevel = data.Canvas.zoomLevel;

    };

}


new State({

    defaultState: true,

    name: 'editor',

    keybinds: {

        spacebar: () => nodeFinder.show()

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

            paramName: () => {

                nodeFinder.isLocked = true;

                const dockObject = dock[ event.target.ref ];
                dockObject.edit(() => {
                    nodeFinder.isLocked = false;
                });

            }

        }

    }

});
