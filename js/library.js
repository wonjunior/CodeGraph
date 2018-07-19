var lib = {

    add: {
        label: 'add',
        dock: { execution: 'none', input: [``, ``], output: [``] },
        function: (args)  =>  [args[0]+` + `+args[1]]
    },

    print: {
        label: 'console.log()',
        dock: { execution: 'both', input: [``], output: [] },
        function: (args)  => [`console.log(`+args[0]+`)`]
    },

    init: {
        initializer: true,
        label: 'node_1',
        dock: { execution: 'right', input: [], output: [] }
    }

}
