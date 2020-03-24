'use strict'

class DefaultRouter extends Router {

  constructor() {

    super();

    this.in = new InExeDockFactory([new DockDefinition('in', 'head')]).docks;

    this.out = new OutExeDockFactory([new DockDefinition('out', 'head')]).docks;

  }

  func() {

    this.out[0].trigger();

  }

}