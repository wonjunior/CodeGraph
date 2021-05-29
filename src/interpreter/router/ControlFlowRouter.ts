import { create } from '@/dock/interfaces'
import InExeDock from '@/dock/InExeDock'
import OutExeDock from '@/dock/OutExeDock'
import Router from './Router'

export default (function ControlFlowRouter() { //? don't need wrapper IIFE
    class Conditional extends Router {
        constructor() {
            super()
            this.in = create(InExeDock, [{label: 'in', location: 'head'}])
            this.out = create(OutExeDock, [{label: 'if', location: 'body'}, {label: 'else', location: 'body'}])
        }

        func() {
            // this.process.execute() //? no param?
            // this.out[this.process.arguments[0][0] ? 0 : 1].trigger()
        }

        header() {
            return `if (${this.process.arguments[1][0]}) { \n   blah blah \n }`
        }
    }

    class ForLoop extends Router {
        constructor() {
            super()
            this.in = create(InExeDock, [{label: 'in', location: 'head'}])
            this.out = create(OutExeDock, [{label: 'end', location: 'body'}, {label: 'body', location: 'body'}])
        }
    }

    return { Conditional, ForLoop }
})()