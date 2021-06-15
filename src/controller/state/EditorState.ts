
import Socket from '@/dock/Socket'
import { Draggable, DragType } from '@/Draggable'
import { GraphInputEvent } from '@/GraphEventHandler'
import Linkable from '@/Linkable'
import Node from '@/node/Node'
import { MouseButton } from '../MouseCode'
import { Bindings as Bindings } from './interfaces'


//# ultimately I don't want to see a single css selector here, yikers. enum mapping would be a quick fix...
//# { on: { [GraphObjectType.NODE]: (event: MouseEvent, { object, graph }: {Node, graph})?
export const EditorDefaultState: Bindings<GraphInputEvent> =  {
    keybinds: {
        KeyQ: (): void => { console.log('yeah') },
        Shift_KeyQ: (): void => { console.log('no!!') },
        // spacebar: () => nodeFinder.show(),

        Ctrl_Shift_Space: (): void => console.log('nope'),
    },

    mousebinds: {
        [MouseButton.MIDDLE]: {
            '.objects': (_: MouseEvent, direction: number, { graph }: GraphInputEvent): void => {
                graph.canvas.zoom.update(direction)
            }
        },

        [MouseButton.RIGHT]: {
            on: {
                '.objects': (event: MouseEvent, { graph }: GraphInputEvent): void => {
                    new Draggable({
                        position: event,
                        type: DragType.DRAG,
                        element: graph.canvas.element.positionWrapper,
                        object: graph.canvas,
                        zoom: graph.canvas.zoom,
                    })
                },
                // --debug
                // '.snap-dock': ({ target },
                //             graph = Graph.get(target),
                //             dock = graph.store.get(target)) => {
                //  window.$DOCK = dock
                // },
            },
        },

        [MouseButton.LEFT]: {
            on: {
                '.header': (event: MouseEvent, { graph, object }: GraphInputEvent): void => {
                    const node = <Node> object
                    new Draggable({
                        position: event,
                        type: DragType.DRAG,
                        element: node.element.container,
                        object: node.element,
                        zoom: graph.canvas.zoom,
                        callback: node.update.bind(object),
                    })
                },

                '.node-container': (event: MouseEvent, { object }: GraphInputEvent): void => {
                    (<Node> object).select()
                },

                '.snap-dock': (_: MouseEvent, { graph, object, eventHandler }: GraphInputEvent): void => {
                    new Linkable(<Socket> object, graph, eventHandler)
                },

                // // --debug = links need an exact mouse click on the element, we will need a ghost element
                // 'path': ({ target }) => {
                //     print(target.id)
                // }
            },
        }
    }
}