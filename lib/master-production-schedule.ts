class MasterProductionSchedule {
    private readonly _projectedDemand: number[];
    private readonly _production: number[];
    private readonly _available: number[];

    constructor(projectedDemand: number[], production: number[], available: number[]) {
        this._projectedDemand = projectedDemand;
        this._production = production;
        this._available = available;
    }

    get projectedDemand(): number[] {
        return this._projectedDemand;
    }

    get production(): number[] {
        return this._production;
    }

    get available(): number[] {
        return this._available;
    }
}

export default MasterProductionSchedule;
