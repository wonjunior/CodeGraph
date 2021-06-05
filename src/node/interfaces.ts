import { ProcessParams } from '@/interpreter/interfaces'
import { Pair } from '@/types'

export interface NodeParams {
	label: string,
	background: string,
	header: string,
	position: Pair<number>
}

export interface ComponentParams {
	process: ProcessParams,
	label: string,
	header: string,
	background: string,
	position: Pair<number>,
}