'use strict'

class OutDataDock extends DataDock {

	result = null;
	stringified = '';
	dependencies = new Set();

  constructor(parameters) {

    super(parameters);

  }

	getValue() {

		return { result: this.result, stringified: this.stringified };

	}

	setValue(result, stringified) {

		Object.assign(this, { result, stringified });

	}

	getDependencies() {

		return this.dependencies;

	}

	setDependencies(dependencies) {

		this.dependencies = dependencies;

	}

	propagate(updateET) {

		this.links.forEach(({endDock}) => endDock.trigger(updateET));

	}

}
