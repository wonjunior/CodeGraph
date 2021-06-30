import Graph from '@/Graph'
import { assert } from '@/utils'
import Component from './Component'
import { InputType } from './dock/interfaces'
import { NodeInstance } from './node/interfaces'
import OperatorNode from './node/OperatorNode'
import SetterNode from './node/SetterNode'

document.addEventListener('keydown', event => {
	if (event.code == 'Tab') event.preventDefault()
})


const element = document.querySelector('.window') as HTMLElement
assert(element)

const c = new Component(element, 'myComponent', [
	// { label: 'name' },
	{ label: 'in_channels' },
	{ label: 'out_channels' },
	{ label: 'kernel_size' },
	{ label: 'stride', optional: true },
	{ label: 'dilation', optional: true },
	{ label: 'group', optional: true },
	{ label: 'bias', optional: true },
	{ label: 'padding_mode', optional: true },
])

// const graph = new Graph(element)


// in_channels, out_channels, kernel_size, stride=1, padding=0, dilation=1, groups=1, bias=True, padding_mode='zeros'

const c1 = {
	cstr: SetterNode,
	label: 'Conv2d',
	header: 'pink',
	background: 'conv',
	position: [470,100],
	process:  {
		// requires: ['import torch.nn as nn']
		compute: function() { return null },
		string: function(name: string, in_channels: string, out_channels: string, kernel_size: string,
			stride: number, padding: number, dilation: number, groups: number, bias: boolean, padding_mode: string) { // convert optional parameters to string stride=${stride} if set
				return `${name} = nn.Conv2d(${in_channels}, ${out_channels}, ${kernel_size})`
			},
		params: [
			{ label: 'name', type: InputType.STR },
			{ label: 'in_channels' },
			{ label: 'out_channels' },
			{ label: 'kernel_size' },
			{ label: 'stride', optional: true },
			{ label: 'dilation', optional: true },
			{ label: 'group', optional: true },
			{ label: 'bias', optional: true },
			{ label: 'padding_mode', optional: true },
		],
		// result: {}
	}
}

const c2 = {
	cstr: OperatorNode,
	label: 'conv s=0',
	header: 'pink',
	background: '*',
	position: [150,220],
	process:  {
		compute: function() { return null },
		string: function() {
			return 'yeeet'
		},
		params: [],
		result: [{ label: 'name' }],
	}
}

// graph.add(c1)
// graph.add(c2)

// params : [{
// 	label:
// 	type: { int, str, list, dict, Tensor, Module }
//  optional:
// }]
