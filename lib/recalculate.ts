import MRPComponent from "@/models/MRPComponent";
import Plan from "@/models/plan";

function recalculate(mrp: Plan) {
    // Recalculate MPS
    let componentRequired = [];
    mrp.mpsPeriods.forEach((mpsPeriod, index) => {
        // Recalculate available
        if (index === 0) {
            mpsPeriod.available = mrp.onHand - mpsPeriod.projectedDemand;
        } else {
            mpsPeriod.available = mrp.mpsPeriods[index - 1].available - mpsPeriod.projectedDemand;
        }

        // Recalculate production
        if (mrp.automaticMSPCalculations) {
            mpsPeriod.production = 0;
            if (mpsPeriod.available < 0) {
                if (mrp.automaticMSPCalculations) {

                    mpsPeriod.production = Math.ceil(Math.abs(mpsPeriod.available) / mrp.lotSize) * mrp.lotSize;
                    console.log("demand", mpsPeriod.projectedDemand)
                    console.log("Availabe", mpsPeriod.available)
                    console.log(mpsPeriod.production)
                    // mpsPeriod.available = Math.abs(mpsPeriod.projectedDemand - (mpsPeriod.production + Math.abs(mpsPeriod.available)))
                    mpsPeriod.available = mpsPeriod.production + mpsPeriod.available
                } else {
                    console.log("test")
                }
            }
        } else{

        
            mpsPeriod.available = mpsPeriod.production + mpsPeriod.available    }
            if (mpsPeriod.production === null || mpsPeriod.production == null) {
                mpsPeriod.production=0
                // grossRequirements is null
            }
            componentRequired[index] = mpsPeriod.production;
    
    });
    
       
       propagateGrossRequirementsParent(mrp, componentRequired);
          
      
        console.log(mrp)
        return mrp;
    }
    function propagateGrossRequirements(mrp: MRPComponent, periods ) {
        //console.log(periods)
        mrp.children.forEach(child => {
            
            periods.forEach((period, index) => {
                if (periods[index] == null) {
                    periods[index]=0
                    // grossRequirements is null
                }
    
            child.mrpPeriods[index].grossRequirements = periods[index]*child.quantity;
            recalculateComponent(child);
        });
    })};
    function propagateGrossRequirementsParent(mrp: Plan, periods ) {
       // console.log(periods)
        mrp.mrpComponents.forEach(child => {
            
            periods.forEach((period, index) => {
                console.log("period",period)
                if (periods[index] == null) {
                    periods[index]=0
                    // grossRequirements is null
                }
    
            child.mrpPeriods[index].grossRequirements = periods[index]*child.quantity;
            recalculateComponent(child);
        });
    })};
export function recalculateComponent(mrp: MRPComponent, allowAddingReceipts?: boolean) {
    console.log(mrp)
    
    let componentRequired = [];
    mrp.mrpPeriods.forEach((MRPPeriod, index) => {
        componentRequired.push(0);
        // Recalculate available
        if (index === 0) {
            MRPPeriod.projectedOnHand = mrp.onHand - MRPPeriod.grossRequirements;
        } else {
            MRPPeriod.projectedOnHand = mrp.mrpPeriods[index - 1].projectedOnHand - MRPPeriod.grossRequirements + (mrp.mrpPeriods[index - 1].scheduledReceipts || 0);
        }

        // Check for scheduled receipts possibilities in the future
        if (index + 1 < mrp.leadTime && allowAddingReceipts) {
            const futurePeriod = mrp.mrpPeriods[index + 1];
            if (futurePeriod.grossRequirements > MRPPeriod.projectedOnHand) {
                MRPPeriod.scheduledReceipts = futurePeriod.grossRequirements - MRPPeriod.projectedOnHand;
                MRPPeriod.projectedOnHand = MRPPeriod.projectedOnHand + MRPPeriod.scheduledReceipts;
            }
        }

        for (let index = 0; index < mrp.mrpPeriods.length; index++) {
            const MRPPeriod = mrp.mrpPeriods[index];

            if (index + mrp.leadTime < mrp.mrpPeriods.length) {
                const futurePeriod = mrp.mrpPeriods[index + mrp.leadTime];

                // Sum up all the plannedOrderReceipts from the current week to the week of the grossRequirements
                const totalPlannedOrderReceipts = mrp.mrpPeriods.slice(index, index + mrp.leadTime).reduce((sum, period) => sum + (period.plannedOrderReceipts || 0), 0);

                // Check if the projected on hand inventory plus total planned order receipts will be less than the gross requirements
                if (MRPPeriod.projectedOnHand + totalPlannedOrderReceipts < futurePeriod.grossRequirements) {
                    // Set the planned order releases in the current period
                    // Change: Order the lots in prior weeks
                    const requiredLots = Math.ceil((futurePeriod.grossRequirements - MRPPeriod.projectedOnHand - totalPlannedOrderReceipts) / mrp.lotSize);
                    for (let i = 0; i < requiredLots; i++) {
                        if (index - i >= 0) {
                            mrp.mrpPeriods[index - i].plannedOrderReleases = mrp.lotSize;
                            if (index + mrp.leadTime - i >= 0) {
                                mrp.mrpPeriods[index + mrp.leadTime - i].plannedOrderReceipts = mrp.lotSize;
                            }
                        }
                    }
                }
            }

            if (MRPPeriod.projectedOnHand < 0) {
                MRPPeriod.netRequirements = MRPPeriod.projectedOnHand * -1;
            }

            if (index > 0) {
                MRPPeriod.projectedOnHand = mrp.mrpPeriods[index - 1].projectedOnHand - MRPPeriod.grossRequirements + MRPPeriod.plannedOrderReceipts;
            }
        }

        if (MRPPeriod.projectedOnHand < 0) {
            MRPPeriod.netRequirements = MRPPeriod.projectedOnHand * -1;

            if (index > 0) {
                MRPPeriod.projectedOnHand = mrp.mrpPeriods[index - 1].projectedOnHand - MRPPeriod.grossRequirements + MRPPeriod.plannedOrderReceipts;
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