'use strict'

class ExecutionTree {

  scope = new Map();
  accessBuffer = {};

  static getExecutionTree(root) {

    return root.executionTree || new ExecutionTree(root);

  }

  constructor(root) {

    this.root = root;
    root.executionTree = this;

  }

  update() {

    $_.log(`[ET] ${this.constructor.name}#update()`);
    $_.log(`├── (root) execute root router`);
    this.current = this.root;
    this.execute();

  }

  execute() {

    this.current.execute(false, true);

  }

  next() {



  }

  toString() {

    return `ExecutionTree (scope=Map[${[...this.scope.keys()]}])`;

  }

}