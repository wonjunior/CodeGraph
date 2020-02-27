'use strict'

class DockFactory {

  static sideAttributes = {
    left: { bool: false, capitalized: 'Left', prefix: 'L' },
    right: { bool: true, capitalized: 'Right', prefix: 'R' }
  }

  static typeAttributes = {
    InDataDock: { prefix: 'id' },
    OutDataDock: { prefix: 'od' },
    ExeDock: { prefix: 'e' },
  }

  constructor(dockDefinitions, side, factory) {

    this.sideAttributes = DockFactory.sideAttributes[side];
    this.typeAttributes = DockFactory.typeAttributes[factory.name];

    this.docks = dockDefinitions.map((dockDefinition, index) => {

      const { label, location } = dockDefinition;

      return new factory({
        id: this.constructId(index),
        isRight: this.sideAttributes.bool,
        label,
        location: location + this.sideAttributes.capitalized,
      });

    });

  }

  constructId(index) {

    return uniqueId() + this.sideAttributes.prefix + this.typeAttributes.prefix + index;

  }
}