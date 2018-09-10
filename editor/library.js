'use strict'

const Library  = {
    node: {

        sum: {
            label: 'Sum',
            meta: 'sum add +',
            description: 'This node adds the input values together',
            dataDocks: { in: [ {label: 'int', editable: true}, {label: 'int', editable: true} ], out: [ {} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a+b,
            stringFunc: (a, b) => `${a}+${b}`,
            background: '+'
        },

        ifelse: {
            label: 'If...Else',
            meta: 'if...else if condition branch',
            description: 'If input value is true then executes the if block, else it executes the other one',
            dataDocks: { in: [ ], out: [ ] },
            exeDocks: { in: [ {label: 'condition', switchSection: true} ], out: [ {label: 'if', switchSection: true}, {label: 'else', switchSection: true} ] },
            func: ()  =>  null,
            background: '?'
        },
        sub: {
            label: 'Substract',
            meta: 'deduct substract -',
            description: 'This node substract the second input value from the first',
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a-b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  Number(a)-Number(b),
            stringFunc: (a, b) => `${a}-${b}`,
            background: '−'
        },
        abs: {
            label: 'Absolute',
            meta: 'absolute |',
            description: 'This node takes the absolute value of the input value',
            dataDocks: { in: [ {label: 'a'} ], out: [ {label: '|a|'} ] },
            exeDocks: { in: [], out: [] },
            func: (a)  =>  Math.abs(),
        },
        product: {
            label: 'Multiply',
            meta: 'product multiply multiplication * x',
            description: 'This node multiplies the input values together',
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a×b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a*b,
            background: '×'
        },
        divide: {
            label: 'Divide',
            meta: 'divide division /',
            description: 'This node multiplies the input values together',
            dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'a÷b'} ] },
            exeDocks: { in: [], out: [] },
            func: (a,b)  =>  a*b,
            background: '÷'
        },

        get: {
            label: 'Get',
            hideBody: true,
            meta: 'retrieve get variable',
            description: 'This node gets the value of the specified variable',
            dataDocks: { in: [], out: [ { label: 'variable', switchSection: true } ] },
            exeDocks: { in: [], out: [] },
            func: ()  =>  variables.a, // <? scope
        },
        set: {
            label: 'Set',
            meta: 'assign set variable',
            description: 'This node sets the value of the specified variable',
            dataDocks: { in: [ {label: 'variable'} ], out: [] },
            exeDocks: { in: [{}], out: [{}] },
            func: (value)  =>  { variables.a = {value, string: value} },
            stringFunc: (value) => `a = ${value}`,

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
