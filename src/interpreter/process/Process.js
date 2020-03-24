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

  execute(allowPropagation = false) {

    $.Execution.log(`└──> [P] ${this.constructor.name}#execute(allowPropagation=${allowPropagation})`);
    $.Execution.indent()

    $.Execution.log(`${this.missingArguments() ? '└── (1) some arguments are missing, exiting.' : '├── (1) all arguments are available'}`);
    if (this.missingArguments()) return;

    this.mergeAttributes();
    this.result = this.calculate(...this.arguments);
    $.Execution.log(`├── (5) calculated result:`, this.result);

    $.Execution.log(`├── (6) routing data to output docks:`, this.outputs.map(({id}) => id));
    this.route();

    $.Execution.log(`└── (7) propagating to links:`, this.outputs.reduce((arr, {links}) => arr.concat(links.map(({id}) => id)), []));

    $.Execution.indent();
    this.propagate(allowPropagation);
    $.Execution.log('└──/ data propagation ended')
    $.Execution.unindent();
    $.Execution.unindent();

    return this.result;

  }

  mergeAttributes() {

    this.dependencies = this.mergeDependencies();
    $.Execution.log(`├── (2) merged dependencies:`, this.dependencies);

    this.parents = this.mergeParents();
    $.Execution.log(`├── (3) merged parents: {${[...this.parents].join(', ')}}`);

    this.arguments = this.mergeArguments();
    $.Execution.log(`├── (4) merged arguments:`, this.arguments);

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

  propagate(updateET) {

    this.outputs.forEach(output => output.propagate(updateET, this.parents));

  }

  func() {

    throw `func() not set on Process ${this}`;

  }

  stringFunc() {

    throw `stringFunc() not set on Process ${this}`;

  }

}