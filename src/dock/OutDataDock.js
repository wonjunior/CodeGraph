'use strict'

class OutDataDock extends MultipleSocket {

  computedValue;
  stringValue;

  constructor(parameters) {

    super(parameters);

  }

  getData() {

    return { dependencies: this.getDependencies(), parents: this.getParents(), value: this.getValue() };

  }

  getValue() {

    return [ this.computedValue, this.stringValue ];

  }

  setValue(value) {

    if (!value) return Object.assign(this, { computedValue: undefined, stringValue: undefined });

    Object.assign(this, { computedValue: value[0], stringValue: value[1] });

  }

  getDependencies() {

    return this.process.dependencies;

  }

  getParents() {

    return this.process.parents.add(this.node);

  }

  propagate(...params) {

    this.links.forEach(link => link.trigger(...params));

  }

}
