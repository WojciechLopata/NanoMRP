class MPSPeriod {
    projectedDemand: number;
    production: number;
    available: number;
    

    constructor(
        forecastedDemand = 0,
        production = 0,
        available = 0,
       
    ) {
        this.projectedDemand = forecastedDemand;
        this.production = production;
        this.available = available;
        
    }
}

export default MPSPeriod;
