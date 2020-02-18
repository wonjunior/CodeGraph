'use strict'

class DefaultRouter extends Router {

    constructor(node) {

        super();

        this.in = new InExeDockFactory([new DockDefinition('in', 'head')], node);

        this.out = new OutExeDockFactory([new DockDefinition('out', 'head')], node);

        this.docks = new Set([...this.in.docks, ...this.out.docks]);

    }

}