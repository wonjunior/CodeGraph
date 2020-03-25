'use strict'

class InDock extends UniqueSocket {

	getAncestor() {

		return this.link ? this.link.start : null;

	}

}