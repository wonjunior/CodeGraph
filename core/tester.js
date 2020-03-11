
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
	position: [275,275],
    process:  {
		func: function(a, b) { return a + b; },
		stringFunc: function(a, b) { return `${a} + ${b}`; },
		params: [{label: 'a'}, {label: 'b'}],
		result: {label: 'result'}
	},
});

new OperatorNode({
	label: 'fake getter',
	header: 'cadetblue',
	position: [50,250],
    process:  {
		func: function(a, b) { return 1; },
		stringFunc: function(a, b) { return `1`; },
		params: [],
		result: {label: '1'}
	},
});

new OperatorNode({
	label: 'fake getter',
	header: 'cadetblue',
	position: [50,350],
    process:  {
		func: function(a, b) { return 2; },
		stringFunc: function(a, b) { return `2`; },
		params: [],
		result: {label: '2'}
	},
});

new GetterNode({
	label: 'g-node',
	header: 'lightgreen',
	background: 'a',
	position: [450,150],
});

new SetterNode({
	label: 's-node',
	header: 'navyblue',
	background: 'c',
	position: [570,292],
});


new ControlFlowNode({
	type: 'Conditional',
	label: 'cf-node',
	header: 'lightcoral',
	background: '?',
	position: [750,100],
});

new ControlFlowNode({
	type: 'ForLoop',
	label: 'cf-node',
	header: 'lightslategray',
	background: '🤢',
	position: [750,250],
});

wait(() => {
	const n1 = Node.all.n3;
	const n2 = Node.all.n4;
	const n6 = Node.all.n2;
	const n4 = Node.all.n6;
	const n11 = Node.all.n1;
	const n7 = Node.all.n7;

	new Link(n1.process.outputs.first, n6.process.inputs[0]);
	new Link(n2.process.outputs.first, n6.process.inputs[1]);
	new Link(n6.process.outputs.first, n4.process.inputs[0]);
	new Link(n6.process.outputs.first, n7.process.inputs[0]);

	new Link(n11.router.out.first, n7.router.in.first);

	n1.process.dependencies.add('a');
	n1.process.parents.add(n1);
	n1.process.outputs.first.result = 1;
	n1.process.outputs.first.stringified = '1';

	n2.process.dependencies.add('b');
	n2.process.parents.add(n2);
	n2.process.outputs.first.result = 2;
	n2.process.outputs.first.stringified = '2';

	// <? n1.router.execute(true); fails, cf. zip accessed array[0])
	n1.process.outputs.first.propagate(true);

	// n11.router.in.first.trigger();

});