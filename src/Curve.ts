import { Pair } from '@/types'

/**
 * Utility class to generate SVG paths
 */
export default class Curve {

	/**
	 * Default properties for the path.
	 */
	static parameters = {
		factor: 0.4,
		warp: 0.05
	}

	/**
	 * Generates the svg path string expression representing a curve.
	 * @param {*} param0
	 * @param {*} param1
	 */
	static calculate([x1, y1]: Pair<number>, [x2, y2]: Pair<number>) {
		const Xdiff = Math.abs(x2 - x1)
		const L = Xdiff * Curve.warp + x1
		const C0 = x1 + Xdiff * Curve.factor
		const C1 = x2 - Xdiff * Curve.factor
		const C2 = - Xdiff * Curve.warp + x2
		return `M ${x1},${y1} L ${L},${y1} C ${C0},${y1} ${C1},${y2} ${C2},${y2} L ${x2},${y2}`
	}

	/**
	 * Gets the curve factor.
	 */
	static get factor() {
		return Curve.parameters.factor
	}

	/**
	 * Sets the curve factor.
	 */
	static set factor(factor: number) {
		Curve.parameters.factor = factor
		// Link.update() //? this should be handled by Canvas or something....
	}

	/**
	 * Gets the curve's relative size.
	 */
	static get warp() {
		return Curve.parameters.warp
	}

	/**
	 * Sets the curve's relative size.
	 */
	static set warp(warp) {
		Curve.parameters.warp = warp
		// Link.update() //? not static update
	}
}