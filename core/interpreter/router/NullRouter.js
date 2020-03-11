'use strict'

class NullRouter extends Router {

	/**
	 * @Overrides Router#execute
	 */
	execute(updateET) {

		return this.process.execute(updateET);

	}

}