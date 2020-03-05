'use strict'

class Router {

  in = [];
  out = [];
  ET = null;

  get docks() {

    return new Set([...this.in, ...this.out]);

  }

  get root() {

    return this.in.first.ancestor ? this.in.first.ancestor.router.root : this;

  }

  execute() {

    $_.log(`[R] UPDATING ${this.constructor.name}, tree root is ${this.root.constructor.name}`);
    $_.indent();
    $_.log(`(1) as an initialized ET = ${!!this.ET}`);
    $_.unindent();

  }

  isExecutable() {

    return !(this instanceof NullRouter);

  }

  header() {}

}