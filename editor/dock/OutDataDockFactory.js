'use strict'

class OutDataDockFactory extends DockFactory {

    constructor(dockDefinitions, node) {

        super(dockDefinitions, 'right', DataDock, node);

    }

}