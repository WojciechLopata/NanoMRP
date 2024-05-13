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

        
        mpsPeriod.available = mpsPeriod.production + mpsPeriod.available    }

});

    // TODO: Other recalculations

    return mrp;
}
function propagateGrossRequirements(mrp: MRPComponent, periods ) {
    console.log(periods)
    mrp.children.forEach(child => {
        
        periods.forEach((period, index) => {
            console.log("period",period)
            if (periods[index] == null) {
                periods[index]=0
                // grossRequirements is null
            }

        child.mrpPeriods[index].grossRequirements += periods[index]*child.quantity;
        recalculateComponent(child);
    });
})};

export function recalculateComponent(mrp: MRPComponent) {
    let componentRequired = [];
    console.log("recalculateComponent")
    console.log(mrp)
    
    mrp.mrpPeriods.forEach((MRPPeriod, index) => {
        componentRequired.push(0);
        // Recalculate available
        if (index === 0) {
            MRPPeriod.projectedOnHand = mrp.onHand - MRPPeriod.grossRequirements;
        } else {
            MRPPeriod.projectedOnHand = mrp.mrpPeriods[index-1].projectedOnHand - MRPPeriod.grossRequirements;
        }
        
        // Check for scheduled receipts possibilities in the future
       if(index + 1 < mrp.leadTime) {
            const futurePeriod = mrp.mrpPeriods[index + 1];
            if(futurePeriod.grossRequirements > MRPPeriod.projectedOnHand) {
                MRPPeriod.scheduledReceipts = futurePeriod.grossRequirements - MRPPeriod.projectedOnHand;
                MRPPeriod.projectedOnHand = MRPPeriod.projectedOnHand + MRPPeriod.scheduledReceipts;

            }

        
        
        
        }
        
        
        if (index + mrp.leadTime < mrp.mrpPeriods.length) {
            const futurePeriod = mrp.mrpPeriods[index + mrp.leadTime];
            
            // Calculate the total number of items that can be produced until the future period
            const totalProductionCapacity = mrp.leadTime * mrp.lotSize;
        
            // Check if the gross requirements of the future period are greater than the projected on-hand inventory
            if (futurePeriod.grossRequirements > futurePeriod.projectedOnHand) {
                // Calculate the number of periods needed to produce the required items
                const periodsNeeded = Math.ceil((futurePeriod.grossRequirements - futurePeriod.projectedOnHand) / mrp.lotSize);
        
                // Start the production earlier
                for (let i = 0; i < periodsNeeded; i++) {
                    if (index + i < mrp.mrpPeriods.length) {
                        const currentPeriod = mrp.mrpPeriods[index + i];
                        currentPeriod.plannedOrderReleases = mrp.lotSize;
                        if (index + i + mrp.leadTime < mrp.mrpPeriods.length) {
                            const receiptPeriod = mrp.mrpPeriods[index + i + mrp.leadTime];
                            receiptPeriod.plannedOrderReceipts = mrp.lotSize;
                        }
                    }
                }
            }
        }
        const totalProductionCapacity = mrp.leadTime * mrp.lotSize;

// Look further into the future
for (let futureIndex = index + 1; futureIndex < mrp.mrpPeriods.length; futureIndex++) {
    const futurePeriod = mrp.mrpPeriods[futureIndex];

    // Check if the gross requirements of the future period are greater than the total production capacity
    if (futurePeriod.grossRequirements > totalProductionCapacity) {
        // Calculate the number of periods needed to produce the required items
        const periodsNeeded = Math.ceil((futurePeriod.grossRequirements - totalProductionCapacity) / mrp.lotSize);

        // Start the production earlier
        for (let i = 0; i < periodsNeeded; i++) {
            if (index + i < mrp.mrpPeriods.length) {
                const currentPeriod = mrp.mrpPeriods[index + i];
                currentPeriod.plannedOrderReleases = mrp.lotSize;
                if (index + i + mrp.leadTime < mrp.mrpPeriods.length) {
                    const receiptPeriod = mrp.mrpPeriods[index + i + mrp.leadTime];
                    receiptPeriod.plannedOrderReceipts = mrp.lotSize;
                }
            }
        }
        // Break the loop as we have already started the production
        break;
    }
}
        if (MRPPeriod.projectedOnHand < 0) {
            MRPPeriod.netRequirements = MRPPeriod.projectedOnHand * -1;
         
           
            if (index > 0) {
                MRPPeriod.projectedOnHand = mrp.mrpPeriods[index-1].projectedOnHand - MRPPeriod.grossRequirements + MRPPeriod.plannedOrderReceipts;
            }
        }
        if (MRPPeriod.grossRequirements === null) {
            MRPPeriod.grossRequirements=0
            // grossRequirements is null
        }
        componentRequired[index] = MRPPeriod.grossRequirements;
    });
   propagateGrossRequirements(mrp, componentRequired);


    return mrp;
}
export default recalculate;