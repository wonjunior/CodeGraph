
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

graph.add(c1);
// graph.add(c1);
graph.add(c2);
graph.add(c3);

/*

new OperatorNode({
  label: 'fake getter',
  header: 'cadetblue',
  position: [30,350],
  process:  {
    func: function(a, b) { return 2; },
    stringFunc: function(a, b) { return `2`; },
    params: [],
    result: {label: '2'}
  },
});

// new GetterNode({
// 	label: 'g-node',
// 	header: 'lightgreen',
// 	background: 'a',
// 	position: [450,550],
// });

new OperatorNode({
  label: 'identity',
  header: 'lightgreen',
  background: 'i',
  position: [465,292],
  process:  {
    func: function(a) { return a; },
    stringFunc: function(a) { return `${a}`; },
    params: [{label:''}],
    result: {label: ''}
  },
});

new SetterNode({
  label: 's-node',
  header: 'navyblue',
  background: 'c',
  position: [680,292],
});


new ControlFlowNode({
  type: 'Conditional',
  label: 'cf-node',
  header: 'lightcoral',
  background: '?',
  position: [680,100],
});

// new ControlFlowNode({
// 	type: 'ForLoop',
// 	label: 'cf-node',
// 	header: 'lightslategray',
// 	background: '🤢',
// 	position: [630,550],
// });*/

wait(() => {
/*
  const n1 = Node.all.n1;
  const n2 = Node.all.n2;
  const n3 = Node.all.n3;
  const n4 = Node.all.n4;
  const n5 = Node.all.n5;
  const n6 = Node.all.n6;
  const n7 = Node.all.n7;

  new Link(n1.router.out.first, n7.router.in.first, $CANVAS.element);
  new Link(n1.process.outputs.first, n7.process.inputs[0], $CANVAS.element);
  new Link(n2.process.outputs.first, n5.process.inputs.first, $CANVAS.element);
  new Link(n3.process.outputs.first, n1.process.inputs[0], $CANVAS.element);
  new Link(n3.process.outputs.first, n2.process.inputs[0], $CANVAS.element);
  new Link(n4.process.outputs.first, n1.process.inputs[1], $CANVAS.element);
  new Link(n4.process.outputs.first, n2.process.inputs[1], $CANVAS.element);
  new Link(n5.process.outputs.first, n6.process.inputs[0], $CANVAS.element);
  new Link(n5.process.outputs.first, n7.process.inputs[1], $CANVAS.element);

  // initialize n3 & n4
  n3.process.dependencies.add('a');
  n3.process.parents.add(n1);
  n3.process.outputs.first.result = 1;
  n3.process.outputs.first.stringified = '1';

  n4.process.dependencies.add('b');
  n4.process.parents.add(n2);
  n4.process.outputs.first.result = 2;
  n4.process.outputs.first.stringified = '2';

  // trigger n2's router
  // n2.process.inputs.first.trigger();
  n2.router.trigger();
*/

});
// <? n1.router.execute(true); fails, cf. zip accessed array[0])