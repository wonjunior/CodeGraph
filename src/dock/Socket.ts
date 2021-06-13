import Link from '@/Link'
import Dock from './Dock'

export default abstract class Socket extends Dock {
	public abstract popExisting(): Socket
	public abstract get occupied(): boolean
	protected links = new Set<Link>()

    public addLink(link: Link): void {
        this.links.add(link)
    }

    public dropLink(link: Link): void {
        this.links.delete(link)
    }

    public update(): void {
        this.links.forEach(link => link.update())
    }

    public destroy(): void {
        this.links.forEach(link => link.destroy())
    }
}