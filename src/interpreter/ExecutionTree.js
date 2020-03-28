'use strict'

class ExecutionTree {

  scope = new Map();
  accessBuffer = new Map();

  static get(root) {

    return root.executionTree || new ExecutionTree(root);

  }

  constructor(root) {

    this.root = root;
    root.executionTree = this; // <?! meh

  }

  validateAccess(accessor) {

    const dependencies = accessor.process.dependencies;

    this.fillAccessBuffer(dependencies.parents, accessor);
    $.Execution.log('---->', this.accessBuffer)

  }

  fillAccessBuffer(dependencies, accessor) {

    dependencies.forEach(dep => {

      this.accessBuffer.set(dep, (this.accessBuffer[dep] || new Set()).add(accessor));

    });

  }

  /**
   *
   * @param {Router} accessor
   * @param {Router} origin
   * @param {Boolean} forceAccess
   */
  update(accessor, origin, forceAccess) {

    $.Execution.log(`└──> [ET] ${this.constructor.name}#update()`);

    $.Execution.indent();
    $.Execution.log(`├── (1) validating access on`, accessor);
    this.validateAccess(accessor)


    $.Execution.indent();
    $.Execution.log(`├── (root) execute root router`);
    this.current = this.root;
    $.Execution.pipe();




    this.execute(origin, forceAccess);


    $.Execution.unindent();
    $.Execution.log('└──/ tree execution ended');
    $.Execution.unindent();
    $.Execution.unindent();

    /*while(this.next()) {

      this.current = this.current.execute();

      break; // safety first
    }*/

  }

  execute(origin, forceAccess) {

    this.current.execute(origin, false, forceAccess);

  }

  next() {

    return this.current;

  }

  toString() {

    return `ExecutionTree (scope=Map[${[...this.scope.keys()]}])`;

  }

}