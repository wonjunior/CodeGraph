'use strict'

/**
 * Utility class to generate SVG paths
 */
class Curve {

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
    static calculate([ startX, startY ], [ endX, endY ]) {

        const Xdiff = Math.abs(endX - startX);

		const M = `M ${startX},${startY}`;

        const L1 = `L ${Xdiff * Curve.warp + startX},${startY}`;

        const c1 = startX + Xdiff * Curve.factor;
        const c2 = endX - Xdiff * Curve.factor;
        const c3 = - Xdiff * Curve.warp + endX;
        const C = `C ${c1},${startY} ${c2},${endY} ${c3},${endY}`;

        const L2 = `L ${endX},${endY}`;

		return `${M} ${L1} ${C} ${L2}`;

	}
	
	/**
	 * Gets the curve factor.
	 */
    static get factor() {

        return Curve.parameters.factor;

    }

	/**
	 * Sets the curve factor.
	 */
    static set factor(newFactor) {

        Curve.parameters.factor = newFactor;
        Link.updateAll();

    }

	/**
	 * Gets the curve's relative size.
	 */
    static get warp() {

        return Curve.parameters.warp;

    }

	/**
	 * Sets the curve's relative size. 
	 */
    static set warp(newWarp) {

        Curve.parameters.warp = newWarp;
        Link.updateAll();

    }

}