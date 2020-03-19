'use strict'

class GraphEventHandler {

	constructor() {


	}

	handle(object) {

		if (object instanceof Link) return this.handleLink(object);

	}

	handleLink(link) {

		const needsUpdating = link.endDock;
		$.GraphEvent.log(`${needsUpdating}`);

	}

}

const geh = new GraphEventHandler();