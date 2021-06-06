import GraphObject from '@/GraphObject'

export default class GraphObjectStore {
    data = new WeakMap<HTMLElement, GraphObject>()

    bind(key: HTMLElement, object: GraphObject) {
        this.data.set(key, object)
    }

    get(key: HTMLElement): GraphObject | null {
        return this.data.get(key) || null
    }
}