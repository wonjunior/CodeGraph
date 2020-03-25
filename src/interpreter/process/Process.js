'use strict'

class Process {

  dependencies = new Set();
  parents = new Set();
  arguments = [];
  result = null;

  get docks() {

    return new Set([...this.inputs, ...this.outputs]);

  }

  readyToCalculate() {

    return this.arguments.length == this.inputs.length;

  }

  execute(allowPropagation = false) {

    $.Execution.log(`└──> [P] ${this.constructor.name}#execute(allowPropagation=${allowPropagation})`);
    $.Execution.indent();

    this.mergeData();
    $.Execution.log(`├── (1) merged data`, this.dependencies, this.parents, this.arguments);

    this.updateResult();
    $.Execution.log(`├── (2) updating the result`, this.result);

    $.Execution.log(`└──> (3) routing & propagating data`);
    this.routeData();
    $.Execution.indent();
    this.propagate(allowPropagation);
    $.Execution.log('└──/ data propagation ended');
    $.Execution.unindent();

    $.Execution.unindent();

  }

  updateResult() {

    this.result = this.readyToCalculate() ? this.calculate(...zip(...this.arguments)) : null;

  }

  clearData() {

    this.dependencies.clear();
    this.parents.clear();
    this.arguments = [];
    this.result = null;

  }

  mergeData() {

    this.clearData();
    this.inputs.forEach(input => this.insertData(input.getData()));

  }

  insertData(data) {

    if (data == null) return;

    const { dependencies, parents, value } = data;

    dependencies.forEach(dep => this.dependencies.add(dep));
    parents.forEach(par => this.parents.add(par));
    this.arguments.push(value);

  }

  calculate(computedParams = [], stringParams = []) {

    return [ this.compute(...computedParams), this.string(...stringParams) ];

  }

  routeData() {

    this.outputs.forEach(output => output.setValue(this.result));

  }

  propagate(updateET) {

    this.outputs.forEach(output => output.propagate(updateET, this.parents));

  }

  compute() { throw `compute() not set on Process ${this}`; }

  string() { throw `string() not set on Process ${this}`; }

}