'use strict'

class DockFactory {

  static attributes = {
    InDataDock: { typePrefix: 'D', sidePrefix: 'L', side: 'Left', isRight: false },
    OutDataDock: { typePrefix: 'D', sidePrefix: 'R', side: 'Right', isRight: true },
    InExeDock: { typePrefix: 'E', sidePrefix: 'L', side: 'Left', isRight: false },
    OutExeDock: { typePrefix: 'E', sidePrefix: 'R', side: 'Right', isRight: true },
  }

  constructor(dockDefinitions, factory) {

    const { typePrefix, sidePrefix, side, isRight } = DockFactory.attributes[factory.name];

    this.docks = dockDefinitions.map((dockDefinition, index) => {

      const { label, location } = dockDefinition;

      return new factory({
        id: uniqueId() + sidePrefix + typePrefix + index,
        isRight,
        label,
        location: location + side,
      });

    });

  }

}