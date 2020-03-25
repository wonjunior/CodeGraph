'use strict'

class InDataDock extends InDock {

  constructor(parameters) {

    super(parameters);

  }

  getDependencies() {

    return this.ancestor.getDependencies();

  }

  getValue() {

    return this.ancestor.getValue();

  }

  trigger(...params) {

    $.Execution.log(`├──> data propagation to ${this.node}`);

    $.Execution.pipe();
    this.node.router.trigger(...params);
    $.Execution.unindent();

  }

}
