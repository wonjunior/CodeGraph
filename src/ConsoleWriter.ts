import { space } from '@/utils'

export enum Consoles { EVENT, EXECUTION, STATE, LINKABLE, DRAGGABLE, GRAPHEVENT }


/**
 * Logger generator enabled on debug mode outputs in a tree-like structure.
 */
export class Writer {
    private static spacer = 11
    private static consoles = {
        [Consoles.EVENT]:      { active: false,     color: 'navy', label: 'Ev' },
        [Consoles.EXECUTION]:  {  active: true,    color: 'green', label: 'Ex' },
        [Consoles.STATE]:      {  active: true,     color: 'grey', label: 'St' },
        [Consoles.LINKABLE]:   { active: false,  color: 'magenta', label: 'Lk' },
        [Consoles.DRAGGABLE]:  { active: false,   color: 'purple', label: 'Dg' },
        [Consoles.GRAPHEVENT]: {  active: true,  color: '#4285f4', label: 'GE' },
    }

    private active: boolean
    private head = ''
    private label: string
    private color: string

    constructor(private type: Consoles) { //? of just Consoles
        const { active, color, label } = Writer.consoles[type]
        Object.assign(this, { active, color, label: this.getLabel(label) })
    }

    indent(): void {
        this.head += '  '
    }

    pipe(): void {
        this.head += ' |'
    }

    unindent(): void {
        this.head = this.head.slice(0,-2)
    }

    newline(): void {
        if (this.active) console.log('')
    }

    log<T extends any[]>(...args: T): void {
        if (!this.active) return;
        console.log(`%c ${this.label} %c`, `background: ${this.color} color: white`, '', this.head, ...args)
    }

    private getLabel(text: string): string {
        const gap = Writer.spacer - text.length
        if (gap < 2) return ` ${text.slice(0, gap-3)}.`
        return `${space(Math.ceil(gap/2))}${text}${space(Math.floor(gap/2))}`
    }
}