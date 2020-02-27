'use strict'

const ControlFlowRouter = (function() {

  class Conditional extends Router {
    constructor() {

      super();

      this.in = new InExeDockFactory([new DockDefinition('in', 'head')]).docks;

      this.out = new OutExeDockFactory([
        new DockDefinition('if', 'body'),
        new DockDefinition('else', 'body'),
      ]).docks;

    }
  }

  class ForLoop extends Router {
    constructor() {

      super();

      this.in = new InExeDockFactory([new DockDefinition('in', 'head')]).docks;

      this.out = new OutExeDockFactory([
        new DockDefinition('end', 'body'),
        new DockDefinition('body', 'body'),
      ]).docks;

    }
  }

  return { Conditional, ForLoop };

})();