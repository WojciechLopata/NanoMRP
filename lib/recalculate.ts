import Plan from "@/models/plan";

function recalculate(mrp: Plan) {
    // Recalculate MPS
    mrp.mpsPeriods.forEach((mpsPeriod, index) => {
        // Recalculate available
        if (index === 0) {
            mpsPeriod.available = mrp.onHand - mpsPeriod.projectedDemand;
        } else {
            mpsPeriod.available = mrp.mpsPeriods[index - 1].available - mpsPeriod.projectedDemand;
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
