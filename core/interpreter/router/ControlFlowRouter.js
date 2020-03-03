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

    func() {

      this.out[this.process.arguments[0][0] ? 0 : 1].trigger();

    }

    header() {

      return `if (${this.process.arguments[1][0]}) { \n   blah blah \n }`;

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