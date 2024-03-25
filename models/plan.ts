import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";

// Main class for the entire plan
class Plan {
    numberOfPeriods: number;
    onHand: number;
    mpsPeriods: MPSPeriod[];
    mrpComponents: MRPComponent[];

    /**
     * Constructor for the Plan class
     * @param numberOfPeriods Number of periods in the entire plan
     * @param onHand Number of finished products at the beginning in the inventory
     * @param mpsPeriods All the periods (columns) in the Master Production Schedule table
     * @param mrpComponents All the components (tables) in the Material Requirements Plan
     */
    constructor(
        numberOfPeriods = 0,
        onHand = 0,
        mpsPeriods = <MPSPeriod[]>[],
        mrpComponents = <MRPComponent[]>[]
    ) {
        this.numberOfPeriods = numberOfPeriods;
        this.onHand = onHand;
        this.mpsPeriods = mpsPeriods;
        this.mrpComponents = mrpComponents;
    }
}

export default Plan;
