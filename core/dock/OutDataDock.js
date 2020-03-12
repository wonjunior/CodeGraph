'use strict'

class OutDataDock extends DataDock {

  result = null;
  stringified = '';

  constructor(parameters) {

    super(parameters);

  }

  getValue() {

    return [ this.result, this.stringified ];

  }

  setValue([result, stringified]) {

    Object.assign(this, { result, stringified });

  }

  getDependencies() {

    return this.process.dependencies;

  }

  getParents() {

    return this.process.parents.add(this.node);

  }

  propagate(...params) {

    this.links.forEach(({endDock}) => endDock.trigger(...params));

  }

}
