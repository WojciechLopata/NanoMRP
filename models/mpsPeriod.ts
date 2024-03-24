class MpsPeriod {
    forecastedDemand: number;
    production: number;
    available: number;

    constructor() {
        this.forecastedDemand = 0;
        this.production = 0;
        this.available = 0;
    }
}

export default MpsPeriod
