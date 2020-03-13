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

    $_.log(`└──> [ET] ${this.constructor.name}#update()`);
    $_.indent();
    $_.log(`├── (root) execute root router`);
    this.current = this.root;
    $_.pipe();
    this.execute();
    $_.unindent();
    $_.log('└──/ tree execution ended');
    $_.unindent();

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