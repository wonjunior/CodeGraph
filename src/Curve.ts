import { Pair } from '@/types'

/**
 * Utility class to generate SVG paths
 */
export default class Curve { //# rename class to be more general (straight lines links)

	/**
	 * Default properties for the path.
	 */
	static parameters = { //# for now curve options are global
		factor: 0.4,
		warp: 0.05
	}

	/**
	 * Generates the svg path string expression representing a curve.
	 * @param [x1, y1] start position
	 * @param [x2, y2] end position
	 */
	static calculate([x1, y1]: Pair<number>, [x2, y2]: Pair<number>): string {
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
	static get factor(): number {
		return Curve.parameters.factor
	}

	/**
	 * Sets the curve factor.
	 */
	static set factor(factor: number) {
		Curve.parameters.factor = factor
	}

	/**
	 * Gets the curve's relative size.
	 */
	static get warp(): number {
		return Curve.parameters.warp
	}

	/**
	 * Sets the curve's relative size.
	 */
	static set warp(warp: number) {
		Curve.parameters.warp = warp
	}
}