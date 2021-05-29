import Dock from '@/dock/Dock'

/**
 * Just a string -> number mapping, merely a type alias
 */
export type map = {[key: string]: number}

/**
 * Tuple shorthand: it's better to spread a two element number [T, T] than a two element array T[]
 */
export type Pair<T> = [T, T]

 /**
  * Unpack the type of an array: for instance Unpack<number[]> will return type number.
  */
 export type Unpack<T> = T extends (infer U)[] ? U : T

 /**
  * Extremely useful when mapping a zipped array since types are infered from the input.
  * Vary cool zip type: Zip<[number[], string[], boolean[]]> will be [number, string, boolean]
  */
 export type Zip<T> = { [K in keyof T]: Unpack<T[K]> }
 export type ZipIterable<T> = IterableIterator<Zip<T>>