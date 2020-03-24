'use strict'

const ControlFlowProcess = (function() {

  class Conditional extends CustomProcess {
    constructor() {

      super(null, null, [{ label: 'condition' }, { label: 'condition' }], []);

    }

    stringFunc(condition) { return condition; }
    func(condition) { return Boolean(condition); }
  }

  class ForLoop extends CustomProcess {
    constructor() {

      super(null, null, [{ label: 'first'}, { label: 'last'}], [{ label: 'index'},{ label: 'array'}]);

    }

    stringFunc(a,b) {return a+b}
    func(a,b) {return a+b}
  }

  return { Conditional, ForLoop };

})();