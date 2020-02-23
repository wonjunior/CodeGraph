
new FunctionNode({
	label: 'f-node',
	header: 'pink',
	background: 'f',
	position: [50,100],
	process:  {
		func: function(a, b) { return a - b; },
		stringFunc: function(a, b) { return `${a} - ${b}`; },
		params: [{label: 'a'}, {label: 'b'}],
		result: {label: 'f(a,b)'}
	},
});

new OperatorNode({
	label: 'o-node',
	header: 'lightblue',
	background: '+',
	position: [50,250],
    process:  {
		func: function(a, b) { return a + b; },
		stringFunc: function(a, b) { return `${a} + ${b}`; },
		params: [{label: 'a'}, {label: 'b'}],
		result: {label: 'result'}
	},
});

new GetterNode({
	label: 'g-node',
	header: 'lightgreen',
	background: 'a',
	position: [450,100],
});

new SetterNode({
	label: 's-node',
	header: 'navyblue',
	background: 'a',
	position: [650,100],
});


new ControlFlowNode({
	type: 'Conditional',
	label: 'cf-node',
	header: 'lightcoral',
	background: '?',
	position: [850,100],
});

new ControlFlowNode({
	type: 'ForLoop',
	label: 'cf-node',
	header: 'lightslategray',
	background: '🤢',
	position: [850,250],
});

wait(() => {
	new Link(Node.all.n1.process.results.first, Node.all.n6.process.params[0]);
	new Link(Node.all.n2.process.results.first, Node.all.n6.process.params[1]);
	Node.all.n1.process.results.first.dependencies.add('1');
	Node.all.n1.process.results.first.result = 1;
	Node.all.n1.process.results.first.dependencies.add('2');
	Node.all.n2.process.results.first.dependencies.add('3');
	Node.all.n2.process.results.first.result = 2;
	_('[TEST001] mergeDependencies on n6', Node.all.n6.process.mergeDependencies());
	const args = Node.all.n6.process.getArguments();
	_('[TEST002] getArguments() on n6', args);
	_('[TEST003] calculate() on n6', Node.all.n6.process.calculate(args[0], args[1]));
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