'use strict'

class InDataDock extends DataDock {

	get ancestor() {

		return this.links.first ? this.links.first.startDock : null;

	}

  constructor(parameters) {

    super(parameters);

  }

	getValue() {

		return this.ancestor.getValue();

	}

	getDependencies() {

		return this.ancestor.getDependencies();

	}

	trigger(updateET) {

		_('triggering: ', this.node);

	}

}
