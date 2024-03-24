import Mrp from "@/models/mrp";

function recalculate(mrp: Mrp) {

    // Recalculate available
    mrp.mpsPeriods.forEach((mpsPeriod, index) => {
        if (index === 0) {
            mpsPeriod.available = mrp.inventory + mpsPeriod.production - mpsPeriod.forecastedDemand;
        } else {
            mpsPeriod.available = mrp.mpsPeriods[index - 1].available + mpsPeriod.production - mpsPeriod.forecastedDemand;
        }
    });

    // TODO: Other recalculations

    return mrp;
}

export default recalculate;
