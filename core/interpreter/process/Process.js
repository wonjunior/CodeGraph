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

    $log(`! UPDATING ${this.constructor.name} !`);
    if (this.missingArguments()) return;
    $log(`(1) all arguments are ready`);

    this.mergeAttributes();
    this.result = this.calculate(...this.arguments);
    $log(`(5) calculated result:`, this.result);

    $log(`(6) routing data to output docks:`, this.outputs);
    this.route();

    $log(`(7) propagating update through links:`, this.outputs.map(({links}) => links));
    this.propagate();

  }

  mergeAttributes() {

    this.dependencies = this.mergeDependencies();
    $log(`(2) merged dependencies:`, this.dependencies);

    this.parents = this.mergeParents();
    $log(`(3) merged parents:`, this.parents);

    this.arguments = this.mergeArguments();
    $log(`(4) merged arguments:`, this.arguments);

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

  propagate() {

    this.outputs.forEach(output => output.propagate(true));

  }

  func() {

    throw `func() not set on Process ${this}`;

  }

  stringFunc() {

    throw `stringFunc() not set on Process ${this}`;

  }

}