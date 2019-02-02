'use strict'

class Stream {

    scope = {};

    constructor(root) {

        this.nodes = [ root ];

    }

    get current() {

        return this.nodes[ this.nodes.length - 1 ];

    }

    set current(nextNode) {

        this.nodes.push(nextNode);

    };

    next() {

        const exeDocks = this.current.exeDocks.out;
        if (exeDocks[0].links.length) {

            return this.current = exeDocks[0].links[0].endDock.node;

        }

    };

    calculate() {

        _(`[Stream ${this.current.id}]`, this)

        const { result, stringResult, dependencies } = this.current.calculate();

        // _('scope', this.scope);
        // _('dependencies', dependencies);

        if (this.current.setter && result) { // <? wrap value : result CAN be undefined

            this.scope[ this.current.setter.variableName ] = result;

        }

    };

}
