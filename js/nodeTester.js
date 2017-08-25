new Node({
    initializer: true,
    name: 'node_1',
    position: [250, 200],
    dock: { execution: 'right', input: [], output: [] },
})

new Node({
    initializer: true,
    name: 'node_2',
    position: [150, 100],
    dock: { execution: 'right', input: [], output: [] },
})

new Node({
    name: 'console.log()',
    position: [690, 245],
    dock: { execution: 'both', input: [``], output: [] },
    function: (args)  => [`console.log(`+args[0]+`)`]
})

new Node({
    name: 'add',
    position: [500, 325],
    dock: { execution: 'none', input: [``, ``], output: ['int'] },
    function: (args)  =>  [args[0]+` + `+args[1]]
})

new Node({
    name: 'var1',
    position: [300, 300],
    dock: { execution: 'none', input: [], output: ['int'] },
    function: ()  =>  [`var1`]
})

new Node({
    name: 'var2',
    position: [300, 400],
    dock: { execution: 'none', input: [], output: ['int'] },
    function: ()  =>  [`var2`]
})

/*
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
*/
