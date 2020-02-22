'use strict'

const ControlFlowRouter = (function() {

  class Conditional extends Router {
    constructor() {

      super();
  
      this.in = new InExeDockFactory([new DockDefinition('in', 'head')]);
  
      this.out = new OutExeDockFactory([
        new DockDefinition('if', 'body'),
        new DockDefinition('else', 'body'),
      ]);
  
      this.docks = new Set([...this.in.docks, ...this.out.docks]);
  
    }
  }

  class ForLoop extends Router {
    constructor() {

      super();
  
      this.in = new InExeDockFactory([new DockDefinition('in', 'head')]);
  
      this.out = new OutExeDockFactory([
        new DockDefinition('end', 'body'),
        new DockDefinition('body', 'body'),
      ]);
  
      this.docks = new Set([...this.in.docks, ...this.out.docks]);

    }
  }

  return { Conditional, ForLoop };

})();