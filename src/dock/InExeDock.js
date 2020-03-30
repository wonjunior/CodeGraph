'use strict'

class InExeDock extends UniqueSocket {

  get ancestor() {

    return this.link ? this.link.getOrigin() : null;

  }

  constructor(parameters) {

    super(parameters);

  }

  trigger(payload) {

    this.node.router.trigger();
    /*$.Execution.log(`├──> exe propagation to ${this.node}`);

    $.Execution.pipe();
    this.node.router.trigger({accessor: this, ...payload });
    $.Execution.unindent();
    $.Execution.log('└──/ data propagation ended');*/

  }

}
