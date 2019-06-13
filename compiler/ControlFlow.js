'use strict'

class ControlFlow {

    static update(node) {

        // <? check for cycles: const cycleDetected = ~data.propagationTree.indexOf(node);

        // _(`[ControlFlow on ${node.id}]`);
        node instanceof Executable ? node.execute() : node.calculate();

    };

    constructor(node) {

        this.node = node;
        this.exeOut = node.exeDocks.out;

    };

    execute() {

        new Stream(this.node.root);

    }

}
