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

  trigger(...params) {

    $.Execution.log(`├──> data propagation to ${this.node.id}`); // (updateET=${updateET}) (router=${this.node.router.constructor.name})`)

    $.Execution.pipe();
    this.node.router.trigger(...params);
    $.Execution.unindent();

  }

}
