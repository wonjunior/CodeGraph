'use strict'

const ControlFlowProcess = (function() {

  class Conditional extends CustomProcess {
    constructor() {

      super(null, null, [{ label: 'cond1' }, { label: 'cond2' }], []);

    }

    string(condition) { return condition; }
    compute(condition) { return Boolean(condition); }
  }

  class ForLoop extends CustomProcess {
    constructor() {

      super(null, null, [{ label: 'first'}, { label: 'last'}], [{ label: 'index'},{ label: 'array'}]);

    }

    string(a,b) {return a+b}
    compute(a,b) {return a+b}
  }

  return { Conditional, ForLoop };

})();