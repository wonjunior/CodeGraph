'use strict'

class GetterProcess extends CustomProcess {

  constructor(variable) {

    super(null, null, [], [{ label: variable }]);

    this.getter = variable;

  };

  compute() {

    return true; // this.process.scope.get(this.getter);

  }

  string() {

    return this.getter;

  }

}