import { MouseEventHandler, EventPayload } from './MouseEventHandler'

export default class MouseWheelEventHandler extends MouseEventHandler {
    /**
     * @overrides MouseEventHandler#trigger
     */
    // private trigger({ callback, event, selector, target = null }: EventPayload) {
    //     callback.bind(this.state.data)({
    //         event, selector, target, direction: Math.sign((<WheelEvent> event).deltaY) // ? graph should come from here
    //     })
    // }
}