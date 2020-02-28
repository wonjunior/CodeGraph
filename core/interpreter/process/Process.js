'use strict'

class Process {

  dependencies = new Set();
  parents = new Set();
  arguments = [];
  result = null;

  get docks() {

    return new Set([...this.inputs, ...this.outputs]);

  }

  missingArguments() {

    return this.inputs.some(({ancestor}) => !ancestor);

  }

  update() {

    if (this.missingArguments()) return;

    this.mergeAttributes();
    this.result = this.calculate(...this.arguments);
    this.route();

  }

  mergeAttributes() {

    this.dependencies = this.mergeDependencies();
    this.parents = this.mergeParents();
    this.arguments = this.mergeArguments();

  }

  mergeDependencies() {

    return new Set(this.inputs.reduce((res, input) => res.concat(...input.getDependencies()), []));

  }

  mergeParents() {

    return new Set(this.inputs.reduce((res, input) => res.concat(...input.getParents()), []));

  }

  mergeArguments() {

    return zip(...this.inputs.map(input => input.getValue()));

  }

  calculate(params, stringParams) {

    return [ this.func(...params), this.stringFunc(...stringParams) ];

  }

  route() {

    this.outputs.forEach(output => output.setValue(this.result));

  }

  func() {

    throw `func not set on Process ${this}`;

  }

  stringFunc() {

    throw `stringFunc not set on Process ${this}`;

  }

}