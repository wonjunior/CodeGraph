'use strict'

class GetterProcess extends CustomProcess {

  constructor(variable) {

    super(null, null, [], [{ label: variable }]);

    this.getter = variable;

  };

  func() {

    return true; // this.process.scope.get(this.getter);

  }

  stringFunc() {

    return this.getter;

  }

}