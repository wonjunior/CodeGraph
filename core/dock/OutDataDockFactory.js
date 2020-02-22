'use strict'

class OutDataDockFactory extends DockFactory {

	constructor(dockDefinitions) {

		super(dockDefinitions, 'right', DataDock);

	}

}