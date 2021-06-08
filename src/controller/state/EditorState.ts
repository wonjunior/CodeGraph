
// import Draggable from '@/Draggable'
// import Graph from '@/Graph'
// import Linkable from '@/Linkable'
// import Editor from '@/Editor'
import Dock from '@/dock/Dock'
import { Draggable, DragType, MousePosition } from '@/Draggable'
import Graph from '@/Graph'
import GraphObject from '@/GraphObject'
import Linkable from '@/Linkable'
import Node from '@/node/Node'
import { MouseButton } from '../MouseCode'
import { State as Bindings } from './interfaces'
// import { StateManager } from './StateManager'

export interface EditorEventPayload {
    event: Event,
    graph: Graph,
    object: GraphObject,
}

//# ultimately I don't want to see a single css selector here, yikers. enum mapping would be a quick fix...
export const EditorDefaultState: Bindings =  {
    keybinds: {
        KeyQ: () => { console.log('yeah') },
        Shift_KeyQ: () => { console.log('no!!') },
        // spacebar: () => nodeFinder.show(),

        Ctrl_Shift_Space: () => console.log('nope'),
    },

    mousebinds: {
        [MouseButton.MIDDLE]: {
            // '.objects': ({ direction, target }, graph = Graph.get(target)) => {
            //     graph.canvas.zoom.update(direction)
            // }
        },

        [MouseButton.RIGHT]: {
            on: {
                // '.objects': ({ event, target }, graph = Graph.get(target)) => {
                //     new Draggable({
                //         event,  // <?! can we not remove this?
                //         type: 'drag',
                //         element: target,
                //         object: graph.canvas,
                //         canvasZoom: graph.canvas.zoom,
                //     })
                // },
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
                '.header': (event: MousePosition, { graph, object }: { graph: Graph, object: Node }) => {
                    new Draggable({
                        position: event,
                        type: DragType.DRAG,
                        element: object.element.container,
                        object: object.element,
                        zoom: graph.canvas.zoom,
                        callback: object.update.bind(object),
                    })
                },

                // '.node-container': ({ target }) => {
                //     target.classList.toggle('selected')
                // },

                '.snap-dock': (event: MouseEvent, { graph, object }: { graph: Graph, object: Dock }) => {
                    new Linkable(event, object, graph)
                },

                // // --debug = links need an exact mouse click on the element, we will need a ghost element
                // 'path': ({ target }) => {
                //     print(target.id)
                // }
            },
        }
    }
}