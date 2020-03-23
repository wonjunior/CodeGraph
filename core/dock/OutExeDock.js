'use strict'

class OutExeDock extends UniqueSocket {

  constructor(parameters) {

    super(parameters);

  }

  propagate(updateET) {

    this.links.forEach(({endDock}) => endDock.trigger(updateET));

  }

}
