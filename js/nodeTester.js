new Node({
  label: 'add',
  position: [100,200],
  input: ['first','second'],
  output: ['sum'],
  argument: [,],
  return: [],
  function: function() {
      return new Obj(this.return).bind([this.argument[0]+this.argument[1]]);
  }
})

new Node({
  label: 'substract',
  position: [100,200],
  input: ['first','second'],
  output: ['sum'],
  argument: [,],
  return: [],
  function: function() {
      return new Obj(this.return).bind([this.argument[0]+this.argument[1]]);
  }
})

/*node.create({
    label: 'Substract',
    position: [250,150],
    input: ['int','int'],
    output: ['int'],
    argument: [,],
    return: [],
    function: function() {
        return new Obj(this.return).bind([this.argument[0]-this.argument[1]]);
    }
});

node.create({
    label: 'Add',
    position: [500, 200],
    input: ['int','int'],
    output: ['int'],
    argument: [,],
    return: [],
    function: function() {
        return new Obj(this.return).bind([this.argument.reduce((a,b) => a + b)])
    }
});

node.create({
    label: 'Muliply',
    position: [300,300],
    input: ['int', 'int', 'int'],
    output: ['int'],
    argument: [,,],
    return: [],
    function: function() {
        return new Obj(this.return).bind([this.argument.reduce((a,b) => a * b)]);
    }
})
node.create({
    label: 'round',
    position: [35,80],
    input: [],
    output: ['life','state'],
    argument: [100,22],
    return: [],
    function: function() {
        return new Obj(this.return).bind(this.argument);
    }
});
node.create({
    label: 'life',
    position: [35,200],
    input: [],
    output: ['int'],
    argument: [10],
    return: [],
    function: function() {
        return new Obj(this.return).bind(this.argument);
    }
});

var vertices = node.getCalculable(node.all)

node.findParameters(vertices)
*/
