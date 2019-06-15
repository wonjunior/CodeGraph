/*new Node({ ...Library.node.log, position: [ 500, 450 ] });

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

*/


/*let params = {
	name: 'test2',
	background: '+',
	header: 'lightgreen',
	executable: false,
    process:  {
		params: [ 
			{ label: 'a', type: 'number', editable: true },
			{ label: 'b', type: 'number' }
		],
		result: { label: 'a+b', type: 'number' },
		function: function(a, b) {
			return a + b;
		},
		string: function(a, b) {
			return `${a} + ${b}`;
		}
	},
}*/

params = {
	name: 'GETTER',
	header: 'lightgreen',
	executable: true,
	getters: [{
		name: 'a'
	}],
	exeDocks: {
		in: [ { label: 'in' } ],
		out: [ { label: 'out' } ]
	},
    process:  {
		params: [ 
			{ label: 'a', type: 'number', editable: true },
			{ label: 'b', type: 'number' }
		],
		result: { label: 'a+b', type: 'number' },
		function: function(a, b) {
			return a + b;
		},
		string: function(a, b) {
			return `${a} + ${b}`;
		}
	},
}

/*

=> docks: {
		getter: [{
			name: 'a'
		}],
		executable: {
			in: [ { label: 'in', parent: 'body' } ],
			out: [ { label: 'out', parent: 'body' } ]
		}
	},
    process:  {
		params: [ 
			{ label: 'a', type: 'number', editable: true },
			{ label: 'b', type: 'number' }
		],
		result: { label: 'a+b', type: 'number' },
		function: function(a, b) {
			return a + b;
		},
		toString: function(a, b) {
			return `${a} + ${b}`;
		}
	}

	dataDocks: {
		in: [
			{ label: 'a', type: 'number', editable: true },
			{ label: 'b', type: 'number' }
		],
		out: [ { name: 'a' } ]
	},
	exeDocks: {
		in: [ { label: 'in', parent: 'body' } ],
		out: [ { label: 'out', parent: 'body' } ]
	}
 */

new Node(params);




/*(function() {

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

})()*/