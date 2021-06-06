import Component from '@/Component'
import Graph from '@/Graph'
import { assert } from '@/utils'
import SetterNode from './node/SetterNode'

// import KeyEventHandler from '@/controller/KeyEventHandler'
// import { MouseEventHandler } from '@/controller/MouseEventHandler'
// import MouseWheelEventHandler from '@/controller/MouseWheelEventHandler'
// import { StateManager } from '@/controller/state/StateManager'
// import Editor from './Editor'
// import { EditorDefaultState } from './controller/state/EditorState'
// import { MouseEventHandler } from './controller/MouseEventHandler'

// captures all keyboard input on the document
document.addEventListener('keydown', event => {
	if (event.code == 'Tab') event.preventDefault()
})



// // captures all mouse wheel actions on the document
// document.addEventListener('wheel', event => {
//     new MouseWheelEventHandler(event, State.current)
// })

// new Editor
// new StateManager(Editor.state.default, EditorDefaultState)
// StateManager.change(Editor.state.default)

const element = document.querySelector('.window') as HTMLElement
assert(element)

const graph = new Graph(element)


// in_channels, out_channels, kernel_size, stride=1, padding=0, dilation=1, groups=1, bias=True, padding_mode='zeros'

const c1 = new Component(SetterNode, {
	label: 'conv s=0',
	header: 'pink',
	background: '*',
	position: [270,100],
	process:  {
		// requires: ['import torch.nn as nn']
		compute: function() { return null },
		string: function(name: string, in_channels: string, out_channels: string, kernel_size: string,
			stride, padding, dilation, groups, bias, padding_mode) { // convert optional parameters to string stride=${stride} if set
				return `${name} = nn.Conv2d(${in_channels}, ${out_channels}, ${kernel_size})`
		},
		params: [
			{ label: 'name' },
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
})

// params : [{
// 	label:
// 	type: { int, str, list, dict, Tensor, Module }
//  optional:
// }]

graph.add(c1)