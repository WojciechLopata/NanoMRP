class MRPPeriod {
    // Total amount required at the end of period
    grossRequirements: number;

    // Additional amount scheduled to be received
    scheduledReceipts: number;

    // Expected amount in the inventory
    projectedOnHand: number;

    // Net amount required
    netRequirements: number;

    // Planned new order
    plannedOrderReleases: number;

    // Amount received from previously planned orders
    plannedOrderReceipts: number;

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
