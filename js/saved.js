wait(function() {
    new Node(Object.assign(lib.add, {position:[500, 325]}))
    new Node(Object.assign(lib.print, {position: [690, 245]}))
    new Node(Object.assign(lib.print, {position: [790, 345]}))
    new Node(Object.assign(lib.init, {position: [250, 200]}))
    new Node(Object.assign(lib.init, {position: [150, 100]}))


    new Node({
        label: 'var1',
        position: [300, 300],
        dock: { execution: 'none', input: [], output: [``] },
        function: ()  =>  [`var1`]
    })

    new Node({
        label: 'var2',
        position: [300, 400],
        dock: { execution: 'none', input: [], output: [``] },
        function: ()  =>  [`var2`]
    })

})
