import { create } from '@/dock/interfaces'
import InExeDock from '@/dock/InExeDock'
import OutExeDock from '@/dock/OutExeDock'
import Router from './Router'

export default class DefaultRouter extends Router {
    public in: Array<InExeDock>
    public out: Array<OutExeDock>

    constructor() {
        super()
        this.in = create(InExeDock, [{ label: '', location: 'head' }])
        this.out = create(OutExeDock, [{ label: '', location: 'head' }])
    }

    func() {
        this.out[0].propagate(true) //? what should updateET be?
    }
}