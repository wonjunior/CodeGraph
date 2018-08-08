'use strict'

const Library  = {
    node: {
        sum: {
            label: 'Sum',
            meta: 'sum add',
            description: 'This node adds the input values together',
            position: [0, 0],
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a+b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a+b,
            background: '+'
        },
        sub: {
            label: 'Substract',
            meta: 'deduct substract',
            description: 'This node substract the second input value from the first',
            position: [0, 0],
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a-b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a-b,
            background: '−'
        },
        abs: {
            label: 'Absolute',
            meta: 'absolute',
            description: 'This node takes the absolute value of the input value',
            position: [0, 0],
            dataDocks: { in: [ {label: 'a'} ], out: [ {label: '|a|'} ] },
            exeDocks: { in: [], out: [] },
            func: (a)  =>  Math.abs(),
        },
        product: {
            label: 'Multiply',
            meta: 'product multiply multiplication',
            description: 'This node multiplies the input values together',
            position: [0, 0],
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a×b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a*b,
            background: '×'
        },
        divide: {
            label: 'Divide',
            meta: 'divide division',
            description: 'This node multiplies the input values together',
            position: [0, 0],
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a÷b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a*b,
            background: '÷'
        },
        get: {
            label: 'Get',
            meta: 'retrieve get variable',
            description: 'This node gets the value of the specified variable',
            position: [0, 0],
            dataDocks: { in: [], out: [ {label: 'variable'} ] },
            exeDocks: { in: [], out: [] },
            func: ()  =>  undefined,
        },
        set: {
            label: 'Set',
            meta: 'assign set variable',
            description: 'This node sets the value of the specified variable',
            position: [0, 0],
            dataDocks: { in: [ {label: 'variable'} ], out: [] },
            exeDocks: { in: [], out: [] },
            func: ()  =>  undefined,
        },
    },
    color: {
        grey: 'rgb(56, 55, 56)',
        darkyellow: 'rgb(135, 122, 16)',
    }
};

// if use below code meta must be an array
/*Object.entries(Library.node).forEach(([ nodeName, { label, description, meta } ]) => {

    Library.node[ nodeName ].meta = meta.join(' ');

});
*/
