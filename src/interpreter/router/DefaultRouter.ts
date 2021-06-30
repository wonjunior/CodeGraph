import { create } from '@/dock/interfaces'
import InExeDock from '@/dock/InExeDock'
import OutExeDock from '@/dock/OutExeDock'
import Router from './Router'

export default class DefaultRouter extends Router {
    public in: Array<InExeDock>
    public out: Array<OutExeDock>

    constructor(in_ = true, out_ = true) { //? don't think this is necessary
        super()
        this.in = create(InExeDock, in_ ? [{ label: '', location: 'head' }] : [])
        this.out = create(OutExeDock, out_ ? [{ label: '', location: 'head' }] : [])
    }

    func() {
        this.out[0].propagate(true) //? what should updateET be?
    }
}