'use strict'

class Process {

  constructor(func, stringFunc, inputs, outputs) {

    const paramDefs = inputs.map(({label}, i) => new DockDefinition(label, 'body'));
    this.inputs = new InDataDockFactory(paramDefs).docks;

    const resultDefs = outputs.map(({label}, i) => new DockDefinition(label, 'body'));
    this.outputs = new OutDataDockFactory(resultDefs).docks;

    if (this.constructor === Process) Object.assign(this, { func, stringFunc });

  }

  getDocks() {

    return new Set([...this.inputs, ...this.outputs]);

  }

  mergeDependencies() {

    return new Set(this.inputs.reduce((res, input) => res.concat(...input.getDependencies()), []));

  }

  mergeParents() {

    return new Set(this.inputs.reduce((res, input) => res.concat(...input.getParents()), []));

  }

  getArguments() {

    return zip(...this.inputs.map(input => input.getValue()));

  }

  calculate(params, stringParams) {

    return [ this.func(...params), this.stringFunc(...stringParams) ];

  }

  route() {

    // this.outputs.forEach(output => )

  }

  func() {

    throw `func not set on Process ${this}`;

  }

  stringFunc() {

    throw `stringFunc not set on Process ${this}`;

  }

}