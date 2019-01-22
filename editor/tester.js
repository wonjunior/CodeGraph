new Node({ ...Library.node.log, position: [ 500, 450 ] });

new Node({ ...Library.node.log, position: [ 600, 550 ] });

new Node({ ...Library.node.sum, position: [ 200, 100 ] });

new Node({ ...Library.node.sum, position: [ 350, 266 ] });


new Node({ ...Library.node.sum, position: [ 200, 450 ] });

new Node({
    ...Library.node.get,
    position: [ 180, 400 ],
    getter: { variableName: 'a', scope: '' }
});

new Node({
    ...Library.node.get,
    position: [ 150, 250 ],
    getter: { variableName: 'b', scope: '' }
});

new Node({ ...Library.node.set, position: [620, 320] });

new Node({ ...Library.node.sub, position: [830, 300] });

new Node({ ...Library.node.abs, position: [780, 500] });

new Node({ ...Library.node.divide, position: [820, 100] });

// new Node({ ...Library.node.ifelse, position: [480, 480] });


new Node({
    label: 'test2',
    position: [500, 100],
    dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'result'}, {label: 'result'}, {label: 'result'} ] },
    exeDocks: { in: [ {label: 'in1'} ], out: [ {label: 'out'}] },
    func: (a,b)  =>  undefined,
    background: '{}',
    headerColor: 'orange'
});


wait(() => {
    new Link(docks.n6dR0, docks.n4dL1);
    new Link(docks.n7dR0, docks.n4dL0);
    new Link(docks.n4dR0, docks.n1dL0);
});
