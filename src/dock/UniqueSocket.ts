import Link from '@/Link'
import { assert } from '@/utils'
import Socket from './Socket'

export default abstract class UniqueSocket extends Socket {
    private get link(): Link {
        return this.links.values().next().value
    }

    public get occupied(): boolean {
        return this.links.size > 0
    }

    public popExisting(): UniqueSocket {
        if (this.occupied) this.destroy()
        return this
    }

    public editLink(): Link {
        assert(this.occupied, `link does not exist on socket ${this}`)
        return this.link.unpin()
    }
}