import MRPPeriod from "@/models/MRPPeriod";

class MRPComponent {
    // The name of the component
    name: string;

    // The amount of the component needed for each parent component
    quantity: number;

    // The time it takes to produce the component
    leadTime: number;

    // The size of a single lot
    lotSize: number;

    // The number of components in the inventory
    onHand: number;

    // All production periods for this component
    mrpPeriods: MRPPeriod[];

    // The children components of this component
    children: MRPComponent[];

    constructor(
        name = '',
        quantity = 0,
        leadTime = 0,
        lotSize = 0,
        onHand = 0,
        mrpPeriods = <MRPPeriod[]>[],
        children = <MRPComponent[]>[]
    ) {
        this.name = name;
        this.quantity = quantity;
        this.leadTime = leadTime;
        this.lotSize = lotSize;
        this.onHand = onHand;
        this.mrpPeriods = mrpPeriods;
        this.children = children;
    }
}

export default MRPComponent;