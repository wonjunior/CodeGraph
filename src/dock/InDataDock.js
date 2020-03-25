'use strict'

class InDataDock extends InDock {

  constructor(parameters) {

    super(parameters);

  }

  getData() {

    const ancestor = this.getAncestor();
    return ancestor && ancestor.getData() || null;

  }

  trigger(...params) {

    $.Execution.log(`├──> data propagation to ${this.node}`);

    $.Execution.pipe();
    this.node.router.trigger(...params);
    $.Execution.unindent();

  }

}
