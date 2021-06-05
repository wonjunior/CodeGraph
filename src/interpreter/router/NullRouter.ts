// import { TriggerArgs } from '../interfaces'
import Router from './Router'

export default class NullRouter extends Router {
    constructor() {
        super()
        this.in = []
        this.out = []
    }

    // /**
    //  * @Overrides Router#trigger
    //  */
    // trigger({ origin = this, updateET = true }: TriggerArgs) {
    //     // $.Execution.log(`└──> [R-${this.constructor.name}] #trigger`)
    //     // $.Execution.indent()
    //     // this.execute({ origin, updateET })
    //     // $.Execution.unindent()
    // }
}