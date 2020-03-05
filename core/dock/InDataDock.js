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

    $_.newline();
    if (this.node.router.isExecutable()) {
      $_.log(`-> executing ${this.node.router.constructor.name} id#${this.node.id} --updateET=${updateET}`)
      return this.node.router.execute();
    }

    $_.log(`-> executing ${this.node.constructor.name} id#${this.node.id} --updateET=${updateET}) from ${this.constructor.name} id#${this.id}`)
    this.node.process.execute();

  }

}
