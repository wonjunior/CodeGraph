import { MouseEventHandler, EventPayload } from './MouseEventHandler'

export default class MouseWheelEventHandler<T> extends MouseEventHandler<T> {
    /**
     * @overrides MouseEventHandler#trigger
     */
    // private trigger({ callback, event, selector, target = null }: EventPayload) {
    //     callback.bind(this.state.data)({
    //         event, selector, target, direction: Math.sign((<WheelEvent> event).deltaY) // ? graph should come from here
    //     })
    // }
}