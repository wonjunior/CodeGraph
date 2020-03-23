'use strict'

class DockFactory {

  static props = {
    InDataDock:   [ false,  true  ],
    OutDataDock:  [ true,   true  ],
    InExeDock:    [ false,  false ],
    OutExeDock:   [ true,   false ],
  }

  constructor(defs, constructor, [ isRight, isData ] = DockFactory.props[constructor.name]) {

    this.docks = defs.map(({ label, location }) => new constructor({ isData, isRight, label, location }));

  }

}