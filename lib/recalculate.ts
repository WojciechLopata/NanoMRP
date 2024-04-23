import MRPComponent from "@/models/MRPComponent";
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

        if(mrp.automaticMSPCalculations){
        mpsPeriod.production = 0;
        if (mpsPeriod.available < 0) {
            if(mrp.automaticMSPCalculations){

                mpsPeriod.production = Math.ceil(Math.abs(mpsPeriod.available)/mrp.lotSize)*mrp.lotSize;
                console.log("demand",mpsPeriod.projectedDemand)
                console.log("Availabe",mpsPeriod.available)
                console.log(mpsPeriod.production)
               // mpsPeriod.available = Math.abs(mpsPeriod.projectedDemand - (mpsPeriod.production + Math.abs(mpsPeriod.available)))
               mpsPeriod.available = mpsPeriod.production + mpsPeriod.available
            }
            else{
            console.log("test")
            }
        }
    }
    else{

        console.log("prod",mpsPeriod.production)
        mpsPeriod.available = mpsPeriod.production + mpsPeriod.available    }

});

    // TODO: Other recalculations

    return mrp;
}

export function recalculateComponent(mrp: MRPComponent) {
    console.log("recalculate componnetn")
    console.log(mrp)
    mrp.mrpPeriods.forEach((MRPPeriod, index) => {
        // Recalculate available
        if (index === 0) {
            MRPPeriod.projectedOnHand = MRPPeriod.projectedOnHand - MRPPeriod.grossRequirements;
        } else {
            MRPPeriod.projectedOnHand = mrp.mrpPeriods[index-1].projectedOnHand - MRPPeriod.grossRequirements;
        }

    //console.log("mrp recalculated")
    //console.log(mrp)

    return mrp;
})
}
export default recalculate;