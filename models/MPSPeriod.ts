class MPSPeriod {
    projectedDemand: number;
    production: number;
    available: number;
    

    /**
     * Constructor for the MPSPeriod class
     * @param forecastedDemand Projected demand for the period
     * @param production Amount of products to be produced
     * @param available Amount of products available in the inventory
     */
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
