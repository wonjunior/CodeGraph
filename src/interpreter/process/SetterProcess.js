'use strict'

class SetterProcess extends CustomProcess {

  constructor(variable) {

    super(null, null, [{ label: variable }], []);

    this.getter = variable;

  }

  func() { return null; }

  stringFunc(value) {

    return `${this.getter} = ${value}`;

  }

}