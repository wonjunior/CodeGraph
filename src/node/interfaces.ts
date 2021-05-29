import Graph from '@/Graph'
import { ProcessParams } from '@/interpreter/interfaces'
import { Pair } from '@/types'
import Node from './Node'

export interface NodeParams {
	label: string,
	background: string,
	header: string,
	position: Pair<number>
}

export interface ComponentParams {
	label: string,
	header: string,
	background: string,
	position: Pair<number>,
	process:  ProcessParams,
}


export type NodeCstr = new (graph: Graph, args: ComponentParams) => Node