'use strict'

class InExeDock extends InDock {

  constructor(parameters) {

    super(parameters);

  }

  trigger(updateET) {

    $.Execution.newline(); $.Execution.log(`-> exe-TRIGGERED ${this.node.router.constructor.name} id#${this.node.id} --updateET=${updateET}`)
    this.node.router.trigger();

  }

}
