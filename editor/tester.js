new Node({ ...Library.node.log, position: [ 500, 450 ] });

new Node({ ...Library.node.log, position: [ 600, 550 ] });

new Node({ ...Library.node.sum, position: [ 200, 100 ] });

new Node({ ...Library.node.sum, position: [ 350, 266 ] });


new Node({ ...Library.node.sum, position: [ 200, 450 ] });

new Node({
    ...Library.node.get,
    position: [ 180, 400 ],
    getter: { variableName: 'a' }
});

new Node({
    ...Library.node.get,
    position: [ 150, 250 ],
    getter: { variableName: 'b' }
});

new Node({
    ...Library.node.set,
    position: [700, 320],
    setter: { variableName: 'a' }
});

new Node({ ...Library.node.sub, position: [950, 300] });

new Node({ ...Library.node.abs, position: [780, 500] });

new Node({ ...Library.node.divide, position: [820, 100] });

// new Node({ ...Library.node.ifelse, position: [480, 480] });


new Node({
    label: 'test2',
    position: [500, 100],
    dataDocks: { in: [ {label: 'a'}, {label: 'b'} ], out: [ {label: 'result'}, {label: 'result'}, {label: 'result'} ] },
    exeDocks: { in: [ {label: 'in'} ], out: [ {label: 'out'}] },
    func: (a,b)  =>  undefined,
    background: '{}',
    headerColor: 'orange'
});


(function() {

    const events = [
        [ docks.n6dR0, docks.n4dL1 ],
        [ docks.n7dR0, docks.n4dL0 ],
        [ docks.n4dR0, docks.n1dL0 ],
        [ docks.n1eR0, docks.n8eL0 ],
        [ docks.n4dR0, docks.n8dL0 ],
        [ docks.n6dR0, docks.n2dL0 ],
    ];
    let i = 0;

    const removeAll = () => {
        document.querySelector('#step').remove();
        document.querySelector('#all').remove();
    }

    document.querySelector('#step').addEventListener('mousedown', function() {

        if (i >= events.length) {
            removeAll();
            return;
        }

        new Link(events[i][0], events[i][1]);

        i++;

        _('--------------------------')

    });

    document.querySelector('#all').addEventListener('mousedown', function() {

        removeAll();

        new Link(docks.n6dR0, docks.n4dL1);
        new Link(docks.n7dR0, docks.n4dL0);
        new Link(docks.n4dR0, docks.n1dL0);
        new Link(docks.n1eR0, docks.n8eL0);
        new Link(docks.n4dR0, docks.n8dL0);

    });

})()
