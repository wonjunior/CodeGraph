'use strict'

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

/*new Node({
	name: 'GETTER',
	header: 'pink',
	executable: true,
	getters: [],
	exeDocks: {},
    process:  {
		params: [],
		result: { label: 'a+b', type: 'number' },
		function: function(a, b) {
			return a + b;
		},
		string: function(a, b) {
			return `${a} + ${b}`;
		}
	},
});

new Node({
	name: 'GETTER',
	header: 'lightblue',
	executable: true,
	getters: [],
	exeDocks: {},
    process:  {
		params: [],
		result: { label: 'a+b', type: 'number' },
		function: function(a, b) {
			return a + b;
		},
		string: function(a, b) {
			return `${a} + ${b}`;
		}
	},
});*/

new FunctionNode({
	label: 'f',
	header: 'pink',
	background: 'f',
	position: [100,100],
	process:  {
		func: function(a, b) { return a - b; },
		stringFunc: function(a, b) { return `${a} - ${b}`; },
		params: [{label: 'a'}, {label: 'b'}],
		result: {label: 'f(a,b)'}
	},
});

new OperatorNode({
	label: 'Add',
	header: 'lightblue',
	background: '+',
	position: [300,100],
    process:  {
		func: function(a, b) { return a + b; },
		stringFunc: function(a, b) { return `${a} + ${b}`; },
		params: [{label: 'a'}, {label: 'b'}],
		result: {label: 'result'}
	},
});

new GetterNode({
	label: 'Getter',
	header: 'lightgreen',
	background: 'a',
	position: [500,100],
});

new SetterNode({
	label: 'Setter',
	header: 'navyblue',
	background: 'a',
	position: [700,100],
});

/*new Node({
	name: '101',
	header: 'lightblue',
	executable: true,
	getters: [],
	exeDocks: {
        in: [{}],
        out: [{}]
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
});

new Node({
	position: [436, 138],
	name: 'Sum',
	header: 'pink',
	background: '+',
	exeDocks: {
		in: [ { } ],
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
});*/



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