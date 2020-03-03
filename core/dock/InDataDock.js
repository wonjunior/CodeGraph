'use strict'

class InDataDock extends DataDock {

  get ancestor() {

    return this.links.first ? this.links.first.startDock : null;

  }

  constructor(parameters) {

    super(parameters);

  }

  getValue() {

    return this.ancestor.getValue();

  }

  getDependencies() {

    return this.ancestor.getDependencies();

  }

  getParents() {

    return this.ancestor.getParents();

  }

  trigger(updateET) {

    $log();
    $log(`-> triggering (updateET = ${updateET}) ${this.node.constructor.name} id#${this.node.id} (from ${this.constructor.name} id#${this.id})`)
    this.node.process.update();

  }

}
