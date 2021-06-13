import { Pair } from '@/types'
import { assert, identity, normalize, pair, zip } from '@/utils'
import CanvasZoom from '@/view/CanvasZoom'
import Element from '@/view/Element'

interface DragOptions {
    type: DragType,
    position: MousePosition,
    element: HTMLElement,
    object: Element,
    zoom: CanvasZoom,
    callback: () => void
}

export interface MousePosition {
    clientX: number,
    clientY: number
}

export enum DragType {
    DRAG, STICK
}

export class Draggable {
    public element: HTMLElement
    public object: Element
    public zoom: CanvasZoom
    private offset: Pair<number>
    public callback: () => void

    constructor({ type, position, element, object, zoom, callback }: DragOptions) {
        console.log('Draggable', type, element, object, zoom)
        // <? just setter position

         // $.Draggable.log(`┌── Starting dragging`, element)
        this.element = element
        this.object = object
        this.callback = callback || identity
        this.zoom = zoom

        this[type](position)
    }

    [DragType.STICK](position: MousePosition): void {
        assert(this.element.parentElement)
        const parentProp = this.element.parentElement.getBoundingClientRect() //? use custom Element
        this.offset = [ parentProp.x + 50, parentProp.y + 10 ] as Pair<number>

        this.dragging(position)
        document.addEventListener('mousemove', this.dragging)
        document.addEventListener('mousedown', this.endDrag, { once: true })
    }

    [DragType.DRAG]({ clientX, clientY }: MousePosition): void {
        console.log(clientX, clientY)
        const selfPos = this.element.getBoundingClientRect()
        assert(this.element.parentElement)
        const parentPos = this.element.parentElement.getBoundingClientRect()
        this.offset = [ clientX - selfPos.x + parentPos.x, clientY - selfPos.y + parentPos.y ] //# zip map normalize

        // const offset = zip([clientX, clientY], [selfPos.x, selfPos.y], [], [parentPos.x, parentPos.y]).map(normalize)

        document.addEventListener('mousemove', this.dragging)
        document.addEventListener('mouseup', this.endDrag, { once: true })
    }

    dragging = ({ clientX, clientY }: MousePosition): void => {
        // $.Draggable.log(`├──> client=[${e.clientX}, ${e.clientY}], offset=${this.offset}`)
        const pos = zip([clientX, clientY], this.offset, pair(this.zoom.level), []).map(normalize)

        // $.Draggable.pipe()
        // $.Draggable.log(`└──> new position = [${targetPosition}]`)
        // $.Draggable.indent()
        this.object.position = pos as Pair<number>
        // $.Draggable.unindent()
        // $.Draggable.unindent()

        // this.callback()
    }

    endDrag = (): void => {
        // $.Draggable.log('└──/ dragging ended')
        document.removeEventListener('mousemove', this.dragging)
    }
}