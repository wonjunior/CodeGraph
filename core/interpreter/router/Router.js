'use strict'

class Router {

  in = [];
  out = [];

  constructor(func, input, ouput) {

  }

  getDocks() {

    return new Set([...this.in, ...this.out]);

  }

}