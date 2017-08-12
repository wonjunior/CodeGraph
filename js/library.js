var lib = {

    add: {
      label: 'add',
      input: ['int','int'],
      output: ['sum'],
      argument: [,],
      return: [,],
      function: () => new Obj(this.return).bind([this.argument[0]+this.argument[1]])
    },

    sub: {
      label: 'substract',
      input: ['int','int'],
      output: ['sub'],
      argument: [,],
      return: [,],
      function: () => new Obj(this.return).bind([this.argument[0]-this.argument[1]])
    }

}
