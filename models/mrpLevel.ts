import MrpPeriod from "@/models/mrpPeriod";

class MrpLevel {
    fulfillmentTime: number;
    batchSize: number;
    bomLevel: number;
    inventory: number;
    mrpWeeks: MrpPeriod[];

    constructor(numberOfPeriods: number) {
        this.fulfillmentTime = 0;
        this.batchSize = 0;
        this.bomLevel = 0;
        this.inventory = 0;
        this.mrpWeeks = Array(numberOfPeriods).fill(new MrpPeriod());
    }
}

export default MrpLevel
