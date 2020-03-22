'use strict'

class DockFactory {

  static isRight = {
    InDataDock:   false,
    OutDataDock:  true,
    InExeDock:    false,
    OutExeDock:   true,
  }

  constructor(defs, constructor, isRight = DockFactory.isRight[constructor.name]) {

    this.docks = defs.map(({ label, location }) => new constructor({ isRight, label, location }));

  }

}