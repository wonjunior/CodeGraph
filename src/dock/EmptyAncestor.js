'use strict'

/**
 * Singleton class for InDataDock which don't have an ancestor
 */
class EmptyAncestor {

	static dependencies = { parents: new Set(), getters: new Set() };

	static getDependencies() {

		return EmptyAncestor.dependencies;

	}

	static getValue() {

		return null;

	}

}