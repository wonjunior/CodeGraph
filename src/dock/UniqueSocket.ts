import Link from '@/Link'
import { assert } from '@/utils'
import Socket from './Socket'

export default abstract class UniqueSocket extends Socket {
    private get link(): Link {
        return this.links.values().next().value
    }

    public get occupied() {
        return this.links.size > 1
    }

    public popExisting() {
        if (!this.occupied) this.destroy()
        return this
    }

    public editLink() {
        if (!this.occupied) assert(false, `link does not exist on socket ${this}`)
        return this.link.unpin()
    }
}