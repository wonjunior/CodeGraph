'use strict'

class InExeDock extends Dock {

  get ancestor() {

    return this.links.first ? this.links.first.startDock : null;

  }

  constructor(parameters) {

    super(parameters);

  }

  trigger(updateET) {

    $_.newline();
    $_.log(`-> exe-TRIGGERED ${this.node.router.constructor.name} id#${this.node.id} --updateET=${updateET}`)
    this.node.router.trigger();

  }

}
