import Graph from '@/Graph'
import Node from '@/node/Node'
import { ComponentParams } from '@/node/interfaces'

type Klass = new (graph: Graph, args: ComponentParams) => Node

export default class Component {
	constructor(private cstr: Klass, private args: ComponentParams) {}

	instanciate(graph: Graph): Node {
		return new this.cstr(graph, this.args)
	}
}