'use strict'

class Executable extends Node {

    // scope = {};
    dependencies = {};

    constructor(parameters) {

        super(parameters);

        // attach the execution component to the node's instance
        const controlFlow = new ControlFlow(this);
        this.execute = controlFlow.execute.bind(controlFlow);

    };

    get root() {

        if (!this.exeDocks.in[0].occupied) return this; // <? and if there are no exe "in" docks ?!

        return this.exeDocks.in[0].links[0].startDock.node.root; // <? check if it exists ! two checks!

    };

    set root(e) {};

}
