'use strict'

class ExeDock extends Dock {

  constructor(parameters) {

    super(parameters);

  }

  get ancestor() {

    return this.links.first ? this.links.first.startDock : null;

  }

}
