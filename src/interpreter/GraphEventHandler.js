'use strict'

class GraphEventHandler {

	constructor() {


	}

	handle(object) {

		if (object instanceof Link) return this.handleLink(object);

	}

	handleLink(link) {

		if (link.flowType) { // linking two nodes with data-link

			$.GraphEvent.log(`[data-L] triggers update on "${link.end.node}"`);
			link.trigger();

		} else { // linking two nodes with exe-link

			$.GraphEvent.log(`[exe-L] triggers execution tree merge`);
			ExecutionTree.get(link.start.router).merge(link.end.router.executionTree)

		}

	}

}