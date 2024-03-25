import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";

class Plan {
    // Number of periods in the entire plan
    numberOfPeriods: number;

    // Number of finished products at the beginning in the inventory
    onHand: number;

    // All the periods (columns) in the Master Production Schedule table
    mpsPeriods: MPSPeriod[];

    // All the components (tables) in the Material Requirements Plan
    mrpComponents: MRPComponent[];

    lotSize: number;

    automaticMSPCalculations= false;

    constructor(
        numberOfPeriods = 0,
        onHand = 0,
        mpsPeriods = <MPSPeriod[]>[],
        mrpComponents = <MRPComponent[]>[],
        lotSize=1

    ) {
        this.numberOfPeriods = numberOfPeriods;
        this.onHand = onHand;
        this.mpsPeriods = mpsPeriods;
        this.mrpComponents = mrpComponents;
        this.lotSize=lotSize;
    }
}

export default Plan;
