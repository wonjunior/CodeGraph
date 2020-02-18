'use strict'

class InExeDockFactory extends DockFactory {

    constructor(dockDefinitions, node) {

        super(dockDefinitions, 'left', ExeDock, node);

    }

}