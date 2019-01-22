class Engine {

    static update(endNode) {

        if (endNode.isExecutable) {

            Engine.compile(endNode);

        } else {

            endNode.calculate();

        }

    };

    static compile(node) {

        // initialize the compilation, starting at the node root
        // if in a loop it will be the first of the propagation tree
        // else it is `node`

        const stream = new Stream(node);

        do {

            stream.calculate();

        } while (stream.next());

    };

}

class Stream {

    constructor(rootNode) {

        Object.assign(this, {
            root: rootNode,
            stream: [],
            current: rootNode,
        });

    }

    get current() {

        return this.stream[ this.stream.length-1 ];

    }

    set current(nextNode) {

        this.stream.push(nextNode);

    };

    calculate() {

        this.current.calculate(); // no propagation, right?

    };

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks.length && exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    }

}
