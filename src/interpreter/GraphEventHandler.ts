import { FlowType } from '@/dock/interfaces'
import Link from '@/Link'
import { assert } from '@/utils'

export default class GraphEventHandler {
	handle(object: unknown): void {
		if (object instanceof Link) return this.handleLink(object)
		assert(false)
	}

	handleLink(link: Link): void {
		switch (link.type) {
			case FlowType.DATA:
				// $.GraphEvent.log(`[data-L] triggers update on "${link.end.node}"`)
				link.trigger()
				break
			case FlowType.EXE:
				// $.GraphEvent.log(`[exe-L] triggers execution tree merge`)
				// ExecutionTree.get(link.start.router).merge(link.end.router.executionTree)
				break
			default: break
		}
	}
}