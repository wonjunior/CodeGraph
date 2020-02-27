'use strict'

class InExeDockFactory extends DockFactory {

  constructor(dockDefinitions) {

    super(dockDefinitions, 'left', ExeDock);

  }

}