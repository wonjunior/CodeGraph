import { MouseButton } from './MouseCode'
import { MouseEventHandler, EventPayload } from './MouseEventHandler'

interface WheelEventPayload {
    match?: EventPayload,
    direction: number
}

export default class MouseWheelEventHandler<T> extends MouseEventHandler<T> {
    public call(event: MouseEvent): EventPayload | undefined {
        const on = this.binds[MouseButton.MIDDLE]
        const matchedOn = this.checkSelectorsOn(event, Object.entries(on || {}))
        if (matchedOn) return matchedOn
    }

    public direction(event: Event): number {
        return Math.sign((<WheelEvent> event).deltaY)
    }
}