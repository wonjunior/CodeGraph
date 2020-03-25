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

  trigger(updateET = true) {

    $.Execution.log(`└──> [R] ${this.constructor.name}#trigger(updateET=${updateET})`);
    $.Execution.indent();

    if (!updateET) {

      $.Execution.log('└──  update blocked, exiting');
      $.Execution.unindent();
      return;

    }

    $.Execution.log(`├── (1) root ${this.root === this ? 'is' : 'is not'} self`);
    $.Execution.log(`├── (2) get the execution tree ${this.root === this ? 'from self' : 'from root'}`);

    const executionTree = ExecutionTree.getExecutionTree(this.root);
    $.Execution.log(`└── (3) executing the execution tree ${this.root.executionTree}`);
    $.Execution.indent();
    executionTree.update();
    $.Execution.unindent();

    $.Execution.unindent();

  }

  execute(updateET) {

    $.Execution.log(`└──> [R] ${this.constructor.name}#execute(updateET=${updateET})`);
    $.Execution.indent();
    this.process.execute(updateET);
    $.Execution.unindent();

  }

  header() {}

}