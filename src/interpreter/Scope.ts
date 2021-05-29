
export default class Scope {
	public map = new Map()

	add(key: string, value: string) { //? generic type for value?
		this.map.set(key, value)
	}
}