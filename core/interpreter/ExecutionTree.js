'use strict'

class ExecutionTree {

  scope = new Map();
  accessBuffer = {};

  static getExecutionTree(root, parents) {

    return root.executionTree || new ExecutionTree(root, parents);

  }

  constructor(root, parents) {

    this.root = root;
    root.executionTree = this;

  }

  update() {

    $.Execution.log(`└──> [ET] ${this.constructor.name}#update()`);
    $.Execution.indent();
    $.Execution.log(`├── (root) execute root router`);
    this.current = this.root;
    $.Execution.pipe();
    this.execute();
    $.Execution.unindent();
    $.Execution.log('└──/ tree execution ended');
    $.Execution.unindent();

    /*while(this.next()) {

      this.current = this.current.execute();

      break; // safety first
    }*/

  }

  execute() {

    this.current.execute(false);

  }

  next() {

    return this.current;

  }

  toString() {

    return `ExecutionTree (scope=Map[${[...this.scope.keys()]}])`;

  }

}