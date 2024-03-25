import Mrp from "@/models/mrp";

function recalculate(mrp: Mrp) {
    // Recalculate MPS
    mrp.mpsPeriods.forEach((mpsPeriod, index) => {
        // Recalculate available
        if (index === 0) {
            mpsPeriod.available = mrp.inventory - mpsPeriod.forecastedDemand;
        } else {
            mpsPeriod.available = mrp.mpsPeriods[index - 1].available - mpsPeriod.forecastedDemand;
        }

        // Recalculate production
        mpsPeriod.production = 0;
        if (mpsPeriod.available < 0) {
            mpsPeriod.production = Math.abs(mpsPeriod.available);
            mpsPeriod.available = 0;
        }
    });

    // TODO: Other recalculations

    return mrp;
}

export default recalculate;
