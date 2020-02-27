'use strict'

class OutDataDock extends DataDock {

	result = null;
	stringified = '';
	dependencies = new Set();
	parents = new Set();

  constructor(parameters) {

		super(parameters);

  }

	getValue() {

		return [ this.result, this.stringified ];

	}

	setValue(result, stringified) {

		Object.assign(this, { result, stringified });

	}

	getDependencies() {

		return this.dependencies;

	}

	setDependencies(dependencies) {

		dependencies.forEach(dep => this.dependencies.add(dep));

	}

	getParents() {

		return this.parents.add(this.node);

	}

	setParents(parents) {

		parents.forEach(parent => this.parents.add(parent));

	}

	propagate(updateET) {

		this.links.forEach(({endDock}) => endDock.trigger(updateET));

	}

}
