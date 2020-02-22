'use strict'

class DefaultRouter extends Router {

	constructor() {

		super();

		this.in = new InExeDockFactory([new DockDefinition('in', 'head')]);

		this.out = new OutExeDockFactory([new DockDefinition('out', 'head')]);

		this.docks = new Set([...this.in.docks, ...this.out.docks]);

	}

}