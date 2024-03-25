class MRPPeriod {
    grossRequirements: number;
    scheduledReceipts: number;
    projectedOnHand: number;
    netRequirements: number;
    plannedOrderReleases: number;
    plannedOrderReceipts: number;

    /**
     * Constructor for the MRPPeriod class
     * @param grossRequirements Total amount required at the end of period
     * @param scheduledReceipts Additional amount scheduled to be received
     * @param projectedOnHand Expected amount in the inventory
     * @param netRequirements Net amount required
     * @param plannedOrderReleases Planned new order
     * @param plannedOrderReceipts Amount received from previously planned orders
     */
    constructor(
        grossRequirements = 0,
        scheduledReceipts = 0,
        projectedOnHand = 0,
        netRequirements = 0,
        plannedOrderReleases = 0,
        plannedOrderReceipts = 0
    ) {
        this.grossRequirements = grossRequirements;
        this.scheduledReceipts = scheduledReceipts;
        this.projectedOnHand = projectedOnHand;
        this.netRequirements = netRequirements;
        this.plannedOrderReleases = plannedOrderReleases;
        this.plannedOrderReceipts = plannedOrderReceipts;
    }
}

export default MRPPeriod;
