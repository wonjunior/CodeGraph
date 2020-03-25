'use strict'

class GraphEventHandler {

	constructor() {


	}

	handle(object) {

		if (object instanceof Link) return this.handleLink(object);

	}

	handleLink(link) {

		$.GraphEvent.log(`updating ${link.end}`);
		link.start.node.router.trigger();

	}

}

const geh = new GraphEventHandler();