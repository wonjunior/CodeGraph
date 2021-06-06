
// import Draggable from '@/Draggable'
// import Graph from '@/Graph'
// import Linkable from '@/Linkable'
// import Editor from '@/Editor'
import { MouseButton } from '../MouseCode'
// import { StateManager } from './StateManager'

export const EditorDefaultState =  {
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
                // '.node-container': ({ target }) => {
                //     target.classList.toggle('selected')
                // },

                // '.header': ({ target },
                //             graph = Graph.get(target),
                //             node = graph.get(target)) => {
                //     new Draggable({
                //         event,
                //         type: 'drag',
                //         element: node.element.container,
                //         object: node.element,
                //         canvasZoom: graph.canvas.zoom,
                //         callback: node.update.bind(node),
                //     })
                // },

                // '.snap-dock': ({ target }, graph = Graph.get(target)) => {
                //     new Linkable(event, graph.get(target), graph)
                // },

                // // --debug = links need an exact mouse click on the element, we will need a ghost element
                // 'path': ({ target }) => {
                //     print(target.id)
                // }
            },
        }
    }
}