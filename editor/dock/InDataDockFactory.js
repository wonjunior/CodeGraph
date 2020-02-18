'use strict'

class InDataDockFactory extends DockFactory {

    constructor(dockDefinitions, node) {

        super(dockDefinitions, 'left', DataDock, node);

    }

}