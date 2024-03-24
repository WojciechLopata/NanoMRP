class MrpPeriod {
    totalDemand: number;
    plannedReceipts: number;
    forecastedInventory: number;
    netRequirements: number;
    plannedOrderReleases: number;
    plannedOrderReceipts: number;

    constructor() {
        this.totalDemand = 0;
        this.plannedReceipts = 0;
        this.forecastedInventory = 0;
        this.netRequirements = 0;
        this.plannedOrderReleases = 0;
        this.plannedOrderReceipts = 0;
    }
}

export default MrpPeriod
