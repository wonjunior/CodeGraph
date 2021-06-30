import Graph from '@/Graph'
import { ProcessParams } from '@/interpreter/interfaces'
import { Pair } from '@/types'

export interface NodeParams {
	label: string
	background: string
	header: string
	position: number[]
}

export interface ComponentParams {
	process: ProcessParams
	label: string
	header: string
	background: string
	position: number[]
}

export type NodeCstr<N> = new (graph: Graph, args: ComponentParams) => N

export interface NodeInstance<N> extends ComponentParams {
	cstr: NodeCstr<N>
}