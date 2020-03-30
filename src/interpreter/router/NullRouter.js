'use strict'

class NullRouter extends Router {

  /**
   * @Overrides Router#trigger
   */
  trigger({ origin = this, updateET = true, forceETAccess = false } = {}) {

    $.Execution.log(`└──> [R-${this.constructor.name}] #trigger`);
    $.Execution.indent();
    this.execute({origin, updateET, forceETAccess});
    $.Execution.unindent();

  }

}