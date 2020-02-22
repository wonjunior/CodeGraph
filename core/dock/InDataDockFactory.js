'use strict'

class InDataDockFactory extends DockFactory {

	constructor(dockDefinitions) {

		super(dockDefinitions, 'left', DataDock);

	}

}