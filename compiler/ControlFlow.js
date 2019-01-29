'use strict'

class ControlFlow {

    static update(endNode) {

        if (endNode instanceof Executable) {

            ControlFlow.compile(endNode);

        } else {

            endNode.calculate();

        }

    };

    static compile(node) {

        const stream = new Stream(node);

        do {

            stream.calculate();

        } while (stream.next());

    };

}

class Stream {

    constructor(currentNode) {

        this.nodes = [ currentNode.root ];

    }

    get current() {

        return this.nodes[ this.nodes.length - 1 ];

    }

    set current(nextNode) {

        this.nodes.push(nextNode);

    };

    calculate() {

        this.current.calculate(); // no propagation, right?

    };

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks.length && exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    };

}
