import Dock from '@/dock/Dock'
import { DockDef, DockCstr, create } from '@/dock/interfaces'
import InDataDock from '@/dock/InDataDock'
import OutDataDock from '@/dock/OutDataDock'
import Process from './Process'

export default class CustomProcess extends Process {
	constructor(compute: Function|null, string: Function|null, inputs: DockDef[], outputs: DockDef[]) {
		super()

		this.inputs = this.createDocks(InDataDock, inputs)
		this.outputs = this.createDocks(OutDataDock, outputs)

		if (this.constructor === CustomProcess) Object.assign(this, { compute, string })
	}

	private createDocks<D extends Dock>(cstr: DockCstr<D>, params: DockDef[]): D[] {
		const defs = params.map(({ label }: DockDef) => ({ label, location: 'body' }))
		return create(cstr, defs)
	}
}