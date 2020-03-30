'use strict'

class Router {

  in = [];
  out = [];
  executionTree = null;

  get docks() {

    return new Set([...this.in, ...this.out]);

  }

  get root() {

    return this.in.first.ancestor ? this.in.first.ancestor.router.root : this;

  }

  trigger({accessor, origin = this, updateET = true, forceETAccess = false } = {}) {

    $.Execution.log(`└──> [R-${this.constructor.name}] #trigger`);
    $.Execution.indent();

    if (!updateET) {

      $.Execution.log('└──  update blocked, exiting');
      $.Execution.unindent();
      return;

    }

    $.Execution.log(`├── (1) root ${this.root === this ? 'is' : 'is not'} self`);
    $.Execution.log(`├── (2) get the execution tree ${this.root === this ? 'from self' : 'from root'}`);

    const executionTree = ExecutionTree.get(this.root);

    this.process.mergeDependencies(this);


    $.Execution.log(`└── (3) executing the execution tree ${this.root.executionTree}`);
    $.Execution.indent();
    executionTree.update(accessor, origin, forceETAccess);
    $.Execution.unindent();

    $.Execution.unindent();

  }

  execute(payload) {

    _('payload origin is', payload.origin)
    $.Execution.log(`└──> [R-${this.constructor.name}] #execute`);
    $.Execution.indent();
    this.process.execute(payload);
    $.Execution.unindent();

  }

  header() {}

}