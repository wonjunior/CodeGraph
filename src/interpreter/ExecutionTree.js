'use strict'

class ExecutionTree {

  scope = new Map();
  accessBuffer = new Map();
  active = { origin: null, accessors: new Set() };

  static get(root) {

    return root.executionTree || new ExecutionTree(root);

  }

  constructor(root) {

    this.root = root;
    root.executionTree = this; // <?! meh

  }

  validateAccess(accessor, origin) {

    _('this.accessBuffer', this.accessBuffer, 'origin', origin)

    _('1st cond.:', !this.active.origin);
    if (!this.active.origin) {

      this.active.origin = origin;
      this.active.accessors = this.accessBuffer.get(origin);

    }

    _('2nd cond.:', this.active.origin == origin)
    if (this.active.origin == origin) {

      this.active.accessors.delete(accessor);

      this.active.origin = this.active.accessors.size ? this.active.origin : null;

      return !this.active.origin;

    }

  }

  fillAccessBuffer(dependencies, accessor) {

    dependencies.forEach(dep => {

      this.accessBuffer.set(dep, (this.accessBuffer.get(dep) || new Set()).add(accessor));

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
    $.Execution.log(`├── (1) validating access`);

    const dependencies = accessor.process.dependencies;
    this.fillAccessBuffer(dependencies.parents, accessor);

    const validated = this.validateAccess(accessor, origin);

    if (!validated) {
      $.Execution.log('└──/ access not validated, exiting.');
      $.Execution.unindent();
      return;
    }

    $.Execution.log('├── (2) updated the access buffer', this.accessBuffer)


    $.Execution.log(`├── (3) executing tree nodes`);
    $.Execution.pipe();
    $.Execution.indent();
    this.current = this.root;

    this.execute(origin, forceAccess);


    $.Execution.unindent();
    $.Execution.unindent();
    $.Execution.log('└──/ tree execution ended');
    $.Execution.unindent();

    /*while(this.next()) {

      this.current = this.current.execute();

      break; // safety first
    }*/

  }

  execute(origin, forceAccess) {

    this.current.execute({origin, forceAccess, updateET: false});

  }

  next() {

    return this.current;

  }

  toString() {

    return `ExecutionTree (scope=Map[${[...this.scope.keys()]}])`;

  }

}