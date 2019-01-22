'use strict'

class Editor {

    static save() {

        const saved = {};

        // <? use Object.values instead, keys are not needed
        saved.nodes = Object.entries(nodes).map(([ nodeId, node ]) => {

            return Node.destruct(node);

        });

        saved.links = Object.entries(links).map(([ linkId, link ]) => {

            return Link.destruct(link);

        });

        saved.Canvas = (function({position, zoomLevel}) {

            return { position, zoomLevel };

        })(Canvas);

        return JSON.stringify(saved);

    };

    static load(dataString) {

        const data = JSON.parse(dataString);

        data.nodes.forEach(nodeObject => {

            new Node(nodeObject);

        });

        data.links.forEach(linkObject => {

            new Link();

        });

        Canvas.position = data.Canvas.position;
        Canvas.zoomLevel = data.Canvas.zoomLevel;

    };

}

new State({

    name: 'editor',

    keybinds: {

        spacebar: () => nodeFinder.show(),

        ctrl_shift_spacebar: (event) => _('nope'),

        delete: () => Selection.delete(),

    }

});
