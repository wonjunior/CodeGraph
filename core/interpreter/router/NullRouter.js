'use strict'

class NullRouter extends Router {

	/**
	 * @Overrides Router#trigger
	 */
	trigger(updateET = true) {

		$_.log(`└──> [R] ${this.constructor.name}#trigger(updateET=${updateET})`);
    $_.indent();
		this.execute(updateET);
		$_.unindent();
		return;

	}

}