'use strict'

class InDock extends UniqueSocket {

	get ancestor() {

		return this.link ? this.link.getOrigin() : EmptyAncestor;

	}

}