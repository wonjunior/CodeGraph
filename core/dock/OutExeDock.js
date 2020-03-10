'use strict'

class OutExeDock extends Dock {

  constructor(parameters) {

    super(parameters);

  }

  propagate(updateET) {

    this.links.forEach(({endDock}) => endDock.trigger(updateET));

  }

}
