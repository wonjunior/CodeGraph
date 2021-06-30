import { DockDef } from './dock/interfaces'
import Graph from './Graph'
import { NodeInstance } from './node/interfaces'
import SetterNode from './node/SetterNode'
import GetterNode from './node/GetterNode'
import OperatorNode from './node/OperatorNode'

export default class Component {
	private graph: Graph
	private getter: GetterNode
	private setter: SetterNode

	constructor(element: HTMLElement, private name: string, private inputs: DockDef[]) {
		this.graph = new Graph(element)

		this.getter = this.graph.add({
			cstr: GetterNode,
			label: 'in',
			header: 'pink',
			background: '·',
			position: [470, 100],
			process:  {
				compute: function() { return null },
				string: function() { return 'yes' },
				result: inputs,
			}
		})

		this.setter = this.graph.add({
			cstr: SetterNode,
			label: 'out',
			header: 'pink',
			background: '·',
			position: [750, 100],
			process:  {
				compute: function() { return null },
				string: function() { return 'yes' },
				params: [],
			}
		})
	}

	public get instance(): NodeInstance<OperatorNode> {
		return {
			cstr: OperatorNode,
			label: this.name,
			header: 'pink',
			background: '',
			position: [0, 0],
			process: {
				compute: function() { return null },
				string: function() { return 'yes' },
				params: this.inputs,
				result: []
			}
		}
	}
}