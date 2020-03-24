
const graph = new Graph(document.querySelector('.window'));

const c1 = new Component(
  FunctionNode,
  {
    label: 'f-node',
    header: 'pink',
    background: 'f',
    position: [270,100],
    process:  {
      func: function(a, b) { return a - b; },
      stringFunc: function(a, b) { return `${a} - ${b}`; },
      params: [{label: 'a'}, {label: 'b'}],
      result: {label: 'f(a,b)'}
    }
  }
);

const c2 = new Component(
  OperatorNode,
  {
  label: 'o-node',
  header: 'lightblue',
  background: '+',
  position: [270,275],
  process:  {
    func: function(a, b) { return a + b; },
    stringFunc: function(a, b) { return `${a} + ${b}`; },
    params: [{label: 'a'}, {label: 'b'}],
    result: {label: 'result'}
  },
});

const c3 = new Component(
  OperatorNode,
  {
    label: 'fake getter',
    header: 'cadetblue',
    position: [30,250],
    process:  {
      func: function(a, b) { return 1; },
      stringFunc: function(a, b) { return `1`; },
      params: [],
      result: {label: '1'}
    },
  },
)

const c4 = new Component(
  OperatorNode,
  {
    label: 'fake getter',
    header: 'cadetblue',
    position: [30,350],
    process:  {
      func: function(a, b) { return 2; },
      stringFunc: function(a, b) { return `2`; },
      params: [],
      result: {label: '2'}
    },
  },
);

// new GetterNode({
// 	label: 'g-node',
// 	header: 'lightgreen',
// 	background: 'a',
// 	position: [450,550],
// });

const c5 = new Component(
  OperatorNode,
  {
    label: 'identity',
    header: 'lightgreen',
    background: 'i',
    position: [465,292],
    process:  {
      func: function(a) { return a; },
      stringFunc: function(a) { return `${a}`; },
      params: [{label:''}],
      result: {label: ''}
    }
  },
);

const c6 = new Component(
  SetterNode,
  {
    label: 's-node',
    header: 'navyblue',
    background: 'c',
    position: [680,292],
  },
);

const c7 = new Component(
  ControlFlowNode,
  {
    type: 'Conditional',
    label: 'cf-node',
    header: 'lightcoral',
    background: '?',
    position: [680,100],
  },
);

// new ControlFlowNode({
// 	type: 'ForLoop',
// 	label: 'cf-node',
// 	header: 'lightslategray',
// 	background: '🤢',
// 	position: [630,550],
// });

const n1=graph.add(c1); const n2=graph.add(c2); const n3=graph.add(c3); const n4=graph.add(c4);
const n5=graph.add(c5); const n6=graph.add(c6); const n7=graph.add(c7);

wait(() => {

  new Link(n1.router.out[0],      n7.router.in[0],      graph);
  new Link(n1.process.outputs[0], n7.process.inputs[0], graph);
  new Link(n2.process.outputs[0], n5.process.inputs[0], graph);
  new Link(n3.process.outputs[0], n1.process.inputs[0], graph);
  new Link(n3.process.outputs[0], n2.process.inputs[0], graph);
  new Link(n4.process.outputs[0], n1.process.inputs[1], graph);
  new Link(n4.process.outputs[0], n2.process.inputs[1], graph);
  new Link(n5.process.outputs[0], n6.process.inputs[0], graph);
  new Link(n5.process.outputs[0], n7.process.inputs[1], graph);

  // initialize n3 & n4
  n3.process.dependencies.add('a');
  n3.process.parents.add(n1);
  n3.process.outputs[0].result = 1;
  n3.process.outputs[0].stringified = '1';

  n4.process.dependencies.add('b');
  n4.process.parents.add(n2);
  n4.process.outputs[0].result = 2;
  n4.process.outputs[0].stringified = '2';

  // trigger n2's router
  // n2.router.trigger();

});
// <? n1.router.execute(true); fails, cf. zip accessed array[0])