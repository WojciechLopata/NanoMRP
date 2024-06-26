import MRPPeriod from "@/models/MRPPeriod";

class MRPComponent {
    name: string;
    quantity: number;
    leadTime: number;
    lotSize: number;
    onHand: number;
    mrpPeriods: MRPPeriod[];
    numberOfPeriods: number;
    children: MRPComponent[];
    automaticChildCalculation: boolean;

    /**
     * Constructor for the MRPComponent class
     * @param name The name of the component
     * @param quantity The amount of the component needed for each parent component
     * @param leadTime The time it takes to produce the component
     * @param lotSize The size of a single lot
     * @param onHand The number of components in the inventory
     * @param numberOfPeriods
     * @param mrpPeriods All production periods for this component
     * @param children The children components of this component
     */
    constructor(
        name = '',
        quantity = 0,
        leadTime = 0,
        lotSize = 0,
        onHand = 0,
        numberOfPeriods= 7,
        mrpPeriods = <MRPPeriod[]>[],
        children = <MRPComponent[]>[],
        automaticChildCalculation = true,
    ) {
        this.numberOfPeriods =numberOfPeriods;
        this.name = name;
        this.quantity = quantity;
        this.leadTime = leadTime;
        this.lotSize = lotSize;
        this.onHand = onHand;
        this.mrpPeriods = mrpPeriods;
        this.children = children;
        this.automaticChildCalculation = true;

    }
}

export default MRPComponent;
