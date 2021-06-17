import { GraphObject, GraphObjectItem } from '@/GraphObject'

export default class GraphObjectStore {
    private data = new WeakMap<HTMLElement, GraphObject>()

    public bind = ([key, object]: GraphObjectItem): void => { //# bound?
        this.data.set(key, object)
    }

    public get = (key: HTMLElement): GraphObject | null => { //# bound?
        return this.data.get(key) || null
    }

    public unbind = (key: HTMLElement): void => {
        this.data.delete(key)
    }
}