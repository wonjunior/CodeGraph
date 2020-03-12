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

  execute(allowPropagation, executeRouter) {

    $_.indent()
    $_.log(`[P] ${this.constructor.name}#execute(allowPropagation=${allowPropagation}), executeRouter=${executeRouter}`);

    /*if (!executeRouter) {

      $_.log('WTF')
      $_.log('no router execution: exiting.')
      $_.unindent();
      return;

    }*/

    $_.log(`└── (1) ${this.missingArguments() ? 'some arguments are missing, exiting.' : 'all arguments are available'}`);
    if (this.missingArguments()) return;

    this.mergeAttributes();
    this.result = this.calculate(...this.arguments);
    $_.log(`├── (5) calculated result:`, this.result);

    $_.log(`├── (6) routing data to output docks:`, this.outputs.map(({id}) => id));
    this.route();

    $_.log(`└── (7) propagating to links:`, this.outputs.reduce((arr, {links}) => arr.concat(links.map(({id}) => id)), []));

    $_.indent();
    this.propagate(allowPropagation, executeRouter);
    $_.unindent();

    $_.unindent();

  }

  mergeAttributes() {

    this.dependencies = this.mergeDependencies();
    $_.log(`├── (2) merged dependencies:`, this.dependencies);

    this.parents = this.mergeParents();
    $_.log(`├── (3) merged parents:`, this.parents);

    this.arguments = this.mergeArguments();
    $_.log(`├── (4) merged arguments:`, this.arguments);

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

  propagate(...params) {

    this.outputs.forEach(output => output.propagate(...params));

  }

  func() {

    throw `func() not set on Process ${this}`;

  }

  stringFunc() {

    throw `stringFunc() not set on Process ${this}`;

  }

}