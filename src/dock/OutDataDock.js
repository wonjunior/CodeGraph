'use strict'

class OutDataDock extends MultipleSocket {

  /**
   * OutDataDock#value is null if the value is not available on that dock
   */
  value = { computed: null, string: null };

  constructor(parameters) {

    super(parameters);

  }

  getDependencies() {

    return this.process.dependencies;

  }

  getValue() {

    return this.value;

  }

  /**
   *
   * @param {DataValue || null} value // <?! add DataValue class
   */
  setValue(value) {

    this.value = value ? { computed: value[0], string: value[1] } : null;

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
