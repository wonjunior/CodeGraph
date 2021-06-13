import { Pair, Zip } from '@/types'

/**
 * One liner utility functions, hope you like them. It's basically my little TS toolbox. Enjoy.
 */


/**
  * The most useful equipment out there. This is a one-line firewall right there.
  */
export function assert<T>(condition: T, msg?: string): asserts condition {
    if (!condition) throw new Error(msg)
}

/**
 * This is probably never going to be used because it's useless.
 */
export function isEmpty(str: string): boolean {
    return !str.replace(/\s/g, '').length
}

/**
 *  You think it's useless until you try it. Think of "async execution queue".
 */
export function wait(fn: Function): number {
    return setTimeout(fn, 0)
}

/**
 * Space string generator, always useful when you want to stretch it a bit.
 */
export function space(n: number): string {
    return new Array(n).fill(' ').join('')
}

/**
 * Returns unique identifier, not thanks to Math.random.
 */
export function id(): symbol {
    return Symbol(Math.random().toString(36).substr(2))
}

/**
 * Probably better than Python because you get an actual tuple type which is very neat.
 */
export function zip<T extends any[]>(...arrays: T): Zip<T>[] {
    return (arrays[0] || []).map((_ = null, i: number) => arrays.map(arr => arr[i]))
}

/**
 * Very nice for duping single values into tuple pairs.
 */
export function pair<T>(x: T, y = x): Pair<T> {
    return [x, y] as Pair<T>
}

// export function pair<T, U>(a: Pair<T>, b: Pair<T>, f: (x: T, y: T) => U): Pair<U> {
//     return [a, b].map(([x, y]) => f(x, y)) as Pair<U>
// }

/**
 * Stops runaways from going too far off.
 */
export function clamp(x: number, min: number, max: number): number {
    return x > max ? max : (x < min ? min : x)
}

/**
 * Totally worth it if you want to make some string look cooler than it actually is.
 */
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * I don't know what this is for.
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
export function normalize([x, shift = 0, scale = 1, adjust = 0]: [number, number, number, number]): number {
    return (x - shift) / scale + adjust
}

/**
 * As the name implies. It won't do much... well I think.
 */
export function identity<T>(...any: T[]): T[] {
    return any
}