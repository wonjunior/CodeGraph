import { GraphObject, GraphObjectBind } from '@/GraphObject'

export default class GraphObjectStore {
    private data = new WeakMap<HTMLElement, GraphObject>()

    public bind = ([key, object]: GraphObjectBind): void => {
        this.data.set(key, object)
    }

    public get = (key: HTMLElement): GraphObject | null => {
        return this.data.get(key) || null
    }
}