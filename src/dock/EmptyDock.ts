import { Deps } from '@/interpreter/interfaces'
import { assert } from '@/utils'
import Dock from './Dock'

/**
 * Singleton class for InDataDock which do not have an ancestor.
 */
export default class EmptyDock extends Dock {
    private static instance: EmptyDock

    private dependencies = { parents: new Set(), getters: new Set() } as Deps

    static get singleton() {
        return this.instance
    }

    getDependencies(): Deps {
        return this.dependencies
    }

    getValue(): never {
        assert(false)
    }
    popExisting(): never {
        assert(false)
    }

    addLink() {}
    dropLink() {}
    destroy() {}
    trigger() {}
    update() {}
}