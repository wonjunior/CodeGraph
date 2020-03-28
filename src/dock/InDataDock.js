'use strict'

class InDataDock extends UniqueSocket {

  get ancestor() {

    return this.link ? this.link.getOrigin() : EmptyAncestor;

  }

  constructor(parameters) {

    super(parameters);

  }

  getDependencies() {

    return this.ancestor.getDependencies();

  }

  getValue() {

    return this.ancestor.getValue();

  }

  trigger(payload) {

    $.Execution.log(`├──> data propagation to ${this.node}`);

    $.Execution.pipe();
    this.node.router.trigger({ accessor: this, ...payload });
    $.Execution.unindent();

  }

}
