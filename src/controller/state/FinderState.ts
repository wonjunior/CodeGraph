import Finder from '@/Finder'
import { State } from './State'

Finder.state = Symbol('finder')

export default new State({
    id: Finder.state,

    keybinds: {
        // 'escape': () => nodeFinder.hide(),
        // 'alphabet': event => nodeFinder.search(event.target.value),
    },

    mousebinds: {
        all: {
            off: {
                // '.search-container': () => nodeFinder.hide()
            }
        }
    }
})
