import { Pair, Zip } from '@/types'

/**
  * Utility functions
  */

export function assert<T>(condition: T, msg?: string): asserts condition {
    if (!condition) throw new Error(msg)
}


/**
 * Alias for console.log
 */
export function print<T extends any[]>(...args: T): void {
    console.log(...args)
}

/**
 * Determine if a string contains either no characters or only spaces.
 */
export function isEmpty(str: string): boolean {
    return !str.replace(/\s/g, '').length
}

/**
 * Add the given function to the JS queue of execution
 */
export function wait(fn: Function): number {
    return setTimeout(fn, 0)
}

/**
 * Space string generator
 */
export function space(n: number): string {
    return new Array(n).fill(' ').join('')
}

// Converts random double into base36 (numbers + letters), and takes first 4 characters.
export function uniqueId(): string {
    return Math.random().toString(36).substr(2, 4)
}

/**
 * Zip operator to loop over multiple arrays at once.
 */
export function zip<T extends any[]>(...arrays: T): Zip<T>[] {
    return (arrays[0] || []).map((_ = null, i: number) => arrays.map(arr => arr[i]))
}

/**
 * Convert single values and two-value arrays into a tuple pair.
 */
export function pair<T>(x: T, y?: T): Pair<T> {
    return (y === null ? [x, x] : [x, y]) as Pair<T>
}

// export function pair<T, U>(a: Pair<T>, b: Pair<T>, f: (x: T, y: T) => U): Pair<U> {
//     return [a, b].map(([x, y]) => f(x, y)) as Pair<U>
// }

/**
 * Clamps input value inside given [`min`, `max`] range.
 */
export function clamp(x: number, min: number, max: number): number {
    return x > max ? max : (x < min ? min : x)
}

/**
 * Capitalize first letter of string.
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert integers to alphabetic character.
 */
export function toAlphabet(i: number): string {
    return String.fromCharCode(97 + i)
}

/**
 * Shift scale operator, i.e. normalize operator value.
 * @param x
 * @param shift
 * @param scale
 */
export function normalize([x, shift, scale]: [number, number, number]): number {
    return (x - shift) / scale
}

/**
 * As the name implies, it won't do much... I think
 */
export function identity(): void {}