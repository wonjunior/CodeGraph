import GraphObject from '@/GraphObject'

export default class ObjectElementMap {
    data = new WeakMap<HTMLElement, GraphObject>()

    bind(key: HTMLElement, object: GraphObject) {
        this.data.set(key, object)
    }

    get(key: HTMLElement): GraphObject | undefined {
        return this.data.get(key)
    }
}