import GraphObject from '@/GraphObject'
import { Pair } from '@/types'
import { assert, normalize, pair, zip } from '@/utils'
import CanvasZoom from '@/view/CanvasZoom'
import Element from '@/view/Element'

interface DragOptions {
    type: DragType,
    position: MousePosition,
    element: HTMLElement,
    object: Element,
    zoom: CanvasZoom,
    callback: Function
}

interface MousePosition {
    clientX: number,
    clientY: number
}

enum DragType {
    DRAG, STICK
}

export default class Draggable {
    public element: HTMLElement
    public object: Element
    public callback: Function
    public zoom: CanvasZoom
    private offset: Pair<number>

    constructor({ type, position, element, object, zoom, callback }: DragOptions) {
         // <? just setter position

         // $.Draggable.log(`┌── Starting dragging`, element)
        this.element = element
        this.object = object
        this.callback = callback || (() => {})
        this.zoom = zoom

        switch (type) {
            case DragType.DRAG: this.startDrag(position); break
            case DragType.STICK: this.startStick(position); break
        }
        assert(false, `DragType ${type} does not exist.`)
    }

    startStick(position: MousePosition) {
        assert(this.element.parentElement)
        const parentProp = this.element.parentElement.getBoundingClientRect() //? use custom Element
        this.offset = [ parentProp.x + 50, parentProp.y + 10 ] as Pair<number>

        this.dragging(position)
        document.addEventListener('mousemove', this.dragging)
        document.addEventListener('mousedown', this.endDrag, { once: true })
    }

    startDrag({ clientX, clientY }: MousePosition) {
        const selfPos = this.element.getBoundingClientRect()
        assert(this.element.parentElement)
        const parentPos = this.element.parentElement.getBoundingClientRect()
        this.offset = [ clientX - selfPos.x + parentPos.x, clientY - selfPos.y + parentPos.y ]

        document.addEventListener('mousemove', this.dragging)
        document.addEventListener('mouseup', this.endDrag, { once: true })
    }

    dragging = ({ clientX, clientY }: MousePosition) => {
        // $.Draggable.log(`├──> client=[${e.clientX}, ${e.clientY}], offset=${this.offset}`)
        const pos = zip([clientX, clientY], this.offset, pair(this.zoom.level)).map(normalize)

        // $.Draggable.pipe()
        // $.Draggable.log(`└──> new position = [${targetPosition}]`)
        // $.Draggable.indent()
        this.object.position = pos as Pair<number>
        // $.Draggable.unindent()
        // $.Draggable.unindent()

        this.callback()
    }

    endDrag = () => {
        // $.Draggable.log('└──/ dragging ended')
        document.removeEventListener('mousemove', this.dragging)
    }
}