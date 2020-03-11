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

  execute(updateET) {

    $_.indent();
    $_.log(`[R] ${this.constructor.name}#execute(updateET=${updateET}) (executionTreeExists?=${!!this.executionTree})`);

    if (updateET) {

      $_.log(`├── (1) root ${this.root === this ? 'is' : 'is not'} self`);
      $_.log(`├── (2) get the execution tree ${this.root === this ? 'from self' : 'from root'}`);

      const executionTree = ExecutionTree.getExecutionTree(this.root);
      $_.log(`└── (3) executing the execution tree ${this.root.executionTree}`);
      $_.indent();
      executionTree.update();
      $_.unindent();

    } else {

		  this.process.execute(updateET);

    }

    $_.unindent();

  }

  header() {}

}