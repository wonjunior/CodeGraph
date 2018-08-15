new Node({...Library.node.sum, ...{position: [200, 100]}});

new Node({...Library.node.product, ...{position: [300, 500]}});

new Node({...Library.node.get, ...{position: [180, 300]}});

new Node({...Library.node.set, ...{position: [520, 320]}});

new Node({...Library.node.sub, ...{position: [830, 300]}});

new Node({...Library.node.abs, ...{position: [780, 500]}});

new Node({...Library.node.divide, ...{position: [820, 100]}});


new Node({
    label: 'test2',
    position: [500, 100],
    dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'result'}, {label: 'result'}, {label: 'result'} ] },
    exeDocks: { in: [ {label: 'in1'} ], out: [ {label: 'out'}] },
    func: (a,b)  =>  _(this),
    background: '?'
});
