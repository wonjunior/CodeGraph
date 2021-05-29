import Component from '@/Component'
import Graph from '@/Graph'
import FunctionNode from '@/node/FunctionNode'
import { assert } from '@/utils'

const element = document.querySelector('.window') as HTMLElement
if (!element) assert(false)

const graph = new Graph(element)
console.log(graph)

const c1 = new Component(FunctionNode, {
	label: 'f-node',
	header: 'pink',
	background: 'f',
	position: [270,100],
	process:  {
		compute: function(a: number, b: number, c: number) { return a - b },
		string: function(a: number, b: number, c: number) { return `${a} - ${b}` },
		params: [{label: 'a'}, {label: 'b'}, {label: 'c'}],
		result: {label: 'f(a,b)'}
	}
})

graph.add(c1)