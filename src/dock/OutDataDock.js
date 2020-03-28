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

    this.process.dependencies.parents.add(this.node);
    return this.process.dependencies;

  }

  getValue() {

    return this.value ? [ this.value.computed, this.value.string ] : null;

  }

  /**
   *
   * @param {DataValue || null} value // <?! add DataValue class
   */
  setValue(value) {

    this.value = value ? { computed: value[0], string: value[1] } : null;

  }

  propagate(payload) {

    this.links.forEach(link => link.trigger(payload));

  }

}
