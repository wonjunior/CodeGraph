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
    $_.log(`TRIGGERING ${this.node.id} (updateET=${updateET}) (router=${this.node.router.constructor.name})`)

    return this.node.router.execute(updateET);

  }

}
