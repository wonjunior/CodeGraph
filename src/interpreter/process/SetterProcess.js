'use strict'

class SetterProcess extends CustomProcess {

  constructor(variable) {

    super(null, null, [{ label: variable }], []);

    this.getter = variable;

  }

  compute() { return null; }

  string(value) { return `${this.getter} = ${value}`; }

}