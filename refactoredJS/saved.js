new Node({
    label: 'test1',
    position: [300, 400],
    dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'result'} ] },
    exeDocks: { in: [ {label: 'in1'} ], out: [ {label: 'out'} ] },
    func: (a,b)  =>  _(this)
});

new Node({
    label: 'test2',
    position: [500, 100],
    dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'result'}, {label: 'result'}, {label: 'result'} ] },
    exeDocks: { in: [ {label: 'in1'} ], out: [ {label: 'out'}] },
    func: (a,b)  =>  _(this)
});
