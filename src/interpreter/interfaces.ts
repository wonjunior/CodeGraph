import InDataDock from '@/dock/InDataDock'
import { DockDef } from '@/dock/interfaces'
import Router from './router/Router'

export interface TriggerArgs {
	accessor: InDataDock,
	origin?: Router,
	updateET?: boolean
}

export interface Deps {
	parents: Set<Router>,
	getters: Set<Router> //? not sure about that
}

export interface Data<T> {
    computed?: T,
    string?: string
}

export interface ProcessParams {
	compute(...args: unknown[]): void,
	string(...args: unknown[]): string,
	params: DockDef[],
	result: DockDef
}
