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
