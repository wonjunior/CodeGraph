'use strict'

class InExeDock extends UniqueSocket {

  get ancestor() {

    return this.links.first ? this.links.first.startDock : null;

  }

  constructor(parameters) {

    super(parameters);

  }

  trigger(updateET) {

    $.Execution.newline();
    $.Execution.log(`-> exe-TRIGGERED ${this.node.router.constructor.name} id#${this.node.id} --updateET=${updateET}`)
    this.node.router.trigger();

  }

}
