'use strict'

class GraphEventHandler {

	constructor() {


	}

	handle(object) {

		if (object instanceof Link) return this.handleLink(object);

	}

	handleLink(link) {

		$.GraphEvent.log(`updating ${link.endDock}`);
		link.endDock.trigger();

	}

}

const geh = new GraphEventHandler();