import Graph from '@/Graph'
import Node from '@/node/Node'
import { ComponentParams, NodeCstr } from '@/node/interfaces'

export default class Component {
	constructor(private cstr: NodeCstr, private args: ComponentParams) {}

	instanciate(graph: Graph): Node {
		return new this.cstr(graph, this.args)
	}
}