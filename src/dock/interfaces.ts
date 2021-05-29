import Dock from './Dock'
import InDataDock from './InDataDock'
import InExeDock from './InExeDock'
import OutDataDock from './OutDataDock'
import OutExeDock from './OutExeDock'

export type Docks = Array<Dock>

export enum FlowType { DATA = 'data', EXE = 'exe' }


export enum DockSide { LEFT = 'left', RIGHT = 'right' }

export interface DockDef {
    label: string,
}

export interface DockParams {
    label: string,
    location: string
}

// export type DataDock = InDataDock | OutDataDock
// export type ExeDock = InExeDock | OutExeDock

export type InDock = InDataDock | InExeDock
export type OutDock = OutDataDock | OutExeDock

export function create<D extends Dock>(cstr: DockCstr<D>, defs: DockParams[]): Array<D> {
    return defs.map(({ label, location }) => new cstr(label, location))
}

export type DockCstr<D> = new (label: string, location: string) => D