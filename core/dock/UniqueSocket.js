'use strict'

class UniqueSocket extends Dock {

  link = null;

  get occupied() {

    return !!this.link;

  }

  constructor(...args) {

    super(...args);

  }

  editLink() {

    return this.link.unpin();

  }

  /**
   * Destroys the link if one is occupying the socket
   * @overrides Dock#popExisting
   */
  popExisting() {

    if (this.link) this.destroy();
    return this;

  }

  addLink(link) {

    this.link = link;

  }

  dropLink(_) {

    this.link = null;

  }

  update() {

    if(this.link) this.link.update();

  }

  destroy() {

    _('destroying', this.link)
    this.link.destroy();

  }

}