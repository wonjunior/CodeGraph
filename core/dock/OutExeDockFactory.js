'use strict'

class OutExeDockFactory extends DockFactory {

	constructor(dockDefinitions) {

		super(dockDefinitions, 'right', ExeDock);

	}

}