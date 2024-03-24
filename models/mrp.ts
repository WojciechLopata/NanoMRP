import MpsPeriod from './mpsPeriod';
import MrpLevel from './mrpLevel';

class Mrp {
    numberOfPeriods: number;
    inventory: number;
    mpsPeriods: MpsPeriod[];
    mrpLevels: MrpLevel[];

    constructor(numberOfPeriods: number) {
        this.numberOfPeriods = numberOfPeriods;
        this.inventory = 0;
        this.mpsPeriods = Array(numberOfPeriods).fill(new MpsPeriod());
        this.mrpLevels = [];
    }
}

export default Mrp;
