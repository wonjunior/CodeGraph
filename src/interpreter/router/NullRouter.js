'use strict'

class NullRouter extends Router {

  /**
   * @Overrides Router#trigger
   */
  trigger({ origin = this, updateET = true } = {}) {

    $.Execution.log(`└──> [R-${this.constructor.name}] #trigger`);
    $.Execution.indent();
    this.execute({ origin, updateET });
    $.Execution.unindent();

  }

}