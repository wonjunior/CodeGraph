new Node({
  label: 'node_1',
  position: [300,350],
  input: ['first','second'],
  output: ['sum'],
  argument: [,],
  return: [],
  function: function() {
        return new Obj(this.return).bind([this.argument[0]+this.argument[1]]);
  }
})

new Node({
    label: 'node_2',
    position: [35,100],
    input: [],
    output: ['life','state'],
    argument: [100,22],
    return: [],
    function: function() {
        return new Obj(this.return).bind(this.argument);
    }
});
new Node({
    label: 'node_3',
    position: [600,300],
    input: ['int', 'int', 'int'],
    output: ['int'],
    argument: [,,],
    return: [],
    function: function() {
        return new Obj(this.return).bind([this.argument.reduce((a,b) => a * b)]);
    }
})

new Node({
label: 'node_4',
position: [250,150],
input: ['int','int'],
output: ['int'],
argument: [,],
return: [],
function: function() {
    return new Obj(this.return).bind([this.argument[0]+this.argument[1]]);
}
});

new Node({
    label: 'node_5',
    position: [500, 400],
    input: ['int','int'],
    output: ['int'],
    argument: [,],
    return: [],
    function: function() {
        return new Obj(this.return).bind([this.argument.reduce((a,b) => a + b)])
    }
});

new Node({
    label: 'node_6',
    position: [475,150],
    input: ['int'],
    output: [],
    argument: [],
    return: [],
    function: function() {
        console.log(this.argument[0])
    }
});
