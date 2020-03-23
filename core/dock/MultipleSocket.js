'use strict'

class MultipleSocket extends Dock {

  links = new Set();

  get occupied() {

    return false;

  }

  constructor(...args) {

    super(...args);

  }

  addLink(link) {

    this.links.add(link);

  }

  dropLink(link) {

    this.links.delete(link);

  }

  update() {

    this.links.forEach(link => link.update());

  }

  destroy() {

    this.links.forEach(link => link.destroy());

  }

}