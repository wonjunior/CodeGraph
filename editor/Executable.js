'use strict'

class Executable extends Node {

    constructor(parameters) {

        super(parameters);

    };

    get root() {

        if (!this.exeDocks.in[0].occupied) return this;

        return this.exeDocks.in[0].links[0].startDock.node.root; // <? check if it exists ! two checks!

    }

    set root(newRoot) {};

}
