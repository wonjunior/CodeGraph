import Link from '@/Link'
import Socket from './Socket'

export default abstract class MultipleSocket extends Socket {
    get occupied(): boolean {
        return false
    }

    public popExisting(): Socket {
        return this
    }
}