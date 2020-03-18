'use strict'

class NullRouter extends Router {

	/**
	 * @Overrides Router#trigger
	 */
	trigger(updateET = true) {

		$.Execution.log(`└──> [R] ${this.constructor.name}#trigger(updateET=${updateET})`);
    $.Execution.indent();
		this.execute(updateET);
		$.Execution.unindent();
		return;

	}

}