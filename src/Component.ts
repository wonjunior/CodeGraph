import Graph from './Graph'
import GetterNode from './node/GetterNode'

export default class Component {
	private graph: Graph

	constructor(element: HTMLElement) {
		this.graph = new Graph(element)

		// define input and output nodes
		// const c1 = {
		// 	cstr: GetterNode,
		// 	label: 'Conv2d',
		// 	header: 'pink',
		// 	background: 'conv',
		// 	position: [470,100],
		// 	process:  {
		// 		// requires: ['import torch.nn as nn']
		// 		compute: function() { return null },
		// 		string: function(name: string, in_channels: string, out_channels: string, kernel_size: string,
		// 			stride: number, padding: number, dilation: number, groups: number, bias: boolean, padding_mode: string) { // convert optional parameters to string stride=${stride} if set
		// 				return `${name} = nn.Conv2d(${in_channels}, ${out_channels}, ${kernel_size})`
		// 			},
		// 		params: [
		// 			{ label: 'name', type: InputType.STR },
		// 			{ label: 'in_channels' },
		// 			{ label: 'out_channels' },
		// 			{ label: 'kernel_size' },
		// 			{ label: 'stride', optional: true },
		// 			{ label: 'dilation', optional: true },
		// 			{ label: 'group', optional: true },
		// 			{ label: 'bias', optional: true },
		// 			{ label: 'padding_mode', optional: true },
		// 		],
		// 		// result: {}
		// 	}
		// }
	}
}