
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
	position: [450,100],
});

new SetterNode({
	label: 's-node',
	header: 'navyblue',
	background: 'c',
	position: [490,292],
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
	const n1 = Node.all.n3;
	const n2 = Node.all.n4;
	const n6 = Node.all.n2;
	const n4 = Node.all.n6;

	new Link(n1.process.outputs.first, n6.process.inputs[0]);
	new Link(n2.process.outputs.first, n6.process.inputs[1]);
	new Link(n6.process.outputs.first, n4.process.inputs[0]);

	n1.process.outputs.first.dependencies.add('a');
	n1.process.outputs.first.parents.add(n1);
	n1.process.outputs.first.result = 1;
	n1.process.outputs.first.stringified = '1';

	n2.process.outputs.first.dependencies.add('b');
	n2.process.outputs.first.parents.add(n2);
	n2.process.outputs.first.result = 2;
	n2.process.outputs.first.stringified = '2';

	// ---- n6
	const n6_res = {};
	n6_res.deps = n6.process.mergeDependencies();
	n6_res.pars = n6.process.mergeParents();
	n6_res.args = n6.process.getArguments();
	// verify that all arguments are available
	n6_res.ress = n6.process.calculate(...n6_res.args);

	// -> set to output dock
	n6.process.outputs.first.setDependencies(n6_res.deps);
	n6.process.outputs.first.setParents(n6_res.pars);
	n6.process.outputs.first.setValue(...n6_res.ress);

	_(n6_res);

	// ---- n4
	const n4_res = {};
	n4_res.deps = n4.process.mergeDependencies();
	n4_res.pars = n4.process.mergeParents();
	n4_res.args = n4.process.getArguments();
	n4_res.ress = n4.process.calculate(...n4_res.args);
	_(n4_res);


});