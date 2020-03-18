'use strict'

// logger generator enabled on debug mode with tree-like structure
class ConsoleWriter {

  static labelLength = 11;
  head = '';

  constructor(type) {

    this.type = type;
    this.label = ConsoleWriter.getLabel(type);
    this.background = DEBUG[type].color;

  }

  indent() {

    this.head += '  ';

  }

  pipe() {

    this.head += ' |';

  }

  unindent() {

    this.head = this.head.slice(0,-2);

  }

  newline() {

    if (DEBUG[this.type].active) console.log('');

  }

  log(...a) {

    if (DEBUG[this.type].active)
      console.log(`%c ${this.label} %c`, `background: ${this.background}; color: white`, '', this.head, ...a);

  }

  static getLabel(text) {

    const gap = ConsoleWriter.labelLength - text.length;
    if (gap < 2) {

      return ` ${text.slice(0, gap-3)}. `;

    } else {

      return [
        space(Math.floor((ConsoleWriter.labelLength - text.length)/2)),
        text,
        space(Math.ceil((ConsoleWriter.labelLength - text.length)/2))
      ].join('');

    }

  }

}

Object.keys(DEBUG).forEach(type => ConsoleWriter[type] = new ConsoleWriter(type));

const $ = ConsoleWriter;