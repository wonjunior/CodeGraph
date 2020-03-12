'use strict'

class NullRouter extends Router {

	/**
	 * @Overrides Router#execute
	 */
	execute(updateET = true, executeProcess = true) {

		return this.process.execute(updateET, executeProcess);

	}

}