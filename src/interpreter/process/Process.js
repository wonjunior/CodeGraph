'use strict'

class Process {

  dependencies = { parents: new Set(), getters: new Set() };
  arguments = [];
  result = null;

  get docks() {

    return new Set([...this.inputs, ...this.outputs]);

  }

  execute(origin, allowPropagation = false, forceAccess = false) {

    $.Execution.log(`└──> [P-${this.constructor.name}] #execute`);
    $.Execution.indent();

    this.mergeDependencies();

    this.mergeArguments();
    $.Execution.log(`├── (1) merged arguments`, this.arguments);

    this.updateResult();
    $.Execution.log(`├── (2) updating the result`, this.result);

    this.routeData();
    $.Execution.log(`├── (3) routing data inside node`);

    $.Execution.log(`└──> (4) propagating data`);
    $.Execution.indent();
    this.propagate(origin, allowPropagation, forceAccess);
    $.Execution.unindent();

    $.Execution.unindent();

  }

  mergeDependencies(self) {

    this.dependencies = { parents: new Set(), getters: new Set() };

    this.inputs.forEach(input => {

      const { parents, getters } = input.getDependencies();

      parents.forEach(p => this.dependencies.parents.add(p));
      getters.forEach(g => this.dependencies.getters.add(g));

    });

    if (self) this.dependencies.parents.add(self);

  }

  mergeArguments() {

    this.arguments = this.inputs.map(i => i.getValue());

  }

  calculate() {

    const params = zip(...this.arguments)
    const [ computedParams, stringParams ] = params.length ? params : [[], []];

    return [ this.compute(...computedParams), this.string(...stringParams) ];

  }

  readyToCalculate() {

    return !this.arguments.some(arg => arg == null);

  }

  updateResult() {

    this.result = this.readyToCalculate() ? this.calculate() : null;

  }

  routeData() {

    this.outputs.forEach(output => output.setValue(this.result));

  }

  propagate(payload) {

    this.outputs.forEach(output => output.propagate(payload));

  }

  compute() { throw `compute() not set on Process ${this}`; }

  string() { throw `string() not set on Process ${this}`; }

}