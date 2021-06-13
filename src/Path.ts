import { Pair } from '@/types'

enum PathType { CURVE, STRAIGHT }

/**
 * Utility class to generate SVG paths
 */
export default class Path {
	/**
	 * Default global path properties.
	 */
	static parameters = {
		factor: 0.4,
		extend: 0.05,
		type: PathType.STRAIGHT
	}

	/**
	 * Generates the svg path string expression representing a curve.
	 * @param [x1, y1] start position
	 * @param [x2, y2] end position
	 */
	static calculate([x1, y1]: Pair<number>, [x2, y2]: Pair<number>): string {
		const diff = Math.abs(x2 - x1)
		const { extend, factor, type } = this.parameters
		const [L1, L2] = [x1 + extend*diff, x2 - extend*diff]
		const [C1, C2] = [x1 + factor*diff, x2 - factor*diff]

		return type == PathType.CURVE
			? `M ${x1},${y1} L ${L1},${y1} C ${C1},${y1} ${C2},${y2} ${L2},${y2} L ${x2},${y2}`
			: `M ${x1},${y1} L ${L1},${y1} L ${L2},${y2} L ${x2},${y2}`
	}
}