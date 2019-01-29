'use strict'

class ControlFlow {

    static update(node) {

        node instanceof Executable ? node.execute() : node.calculate();

    };

    constructor(node) {

        this.node = node;
        this.exeOut = node.exeDocks.out;

    };

    execute() {

        const stream = new Stream(this.node.root);

        do {

            stream.calculate();

        } while (stream.next());

    };

}

class Stream {

    constructor(root) {

        this.nodes = [ root ];

    }

    get current() {

        return this.nodes[ this.nodes.length - 1 ];

    }

    set current(nextNode) {

        this.nodes.push(nextNode);

    };

    calculate() {

        this.current.calculate();

    };

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks.length && exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    };

}
