'use strict'

class Process {

  constructor(func, stringFunc, params, results) {

    const paramDefs = params.map(({label}, i) => new DockDefinition(label, 'body'));
    this.params = new InDataDockFactory(paramDefs);

    const resultDefs = results.map(({label}, i) => new DockDefinition(label, 'body'));
    this.results = new OutDataDockFactory(resultDefs);

    if (this.constructor === Process) Object.assign(this, { func, stringFunc });

    this.docks = new Set([...this.params.docks, ...this.results.docks]);

  }

}