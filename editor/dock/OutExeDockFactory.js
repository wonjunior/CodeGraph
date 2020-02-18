'use strict'

class OutExeDockFactory extends DockFactory {

    constructor(dockDefinitions, node) {

        super(dockDefinitions, 'right', ExeDock, node);

    }

}