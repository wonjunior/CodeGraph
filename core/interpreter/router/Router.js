'use strict'

class Router {

  in = [];
  out = [];

  constructor(func, input, ouput) {

  }

  get docks() {

    return new Set([...this.in, ...this.out]);

  }

}