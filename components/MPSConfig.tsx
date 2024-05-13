import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import recalculate from "@/lib/recalculate";
import {ChangeEvent} from "react";
import MPSPeriod from "@/models/MPSPeriod";

export default function MPSConfig(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void
}) {
    const {plan, setPlan} = props;

    console.log("From Config", plan);

    const handleNumberOfPeriodsChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get the new number of periods
        const numberOfPeriods = parseInt(e.target.value) || 0;

        // Update the number of periods
        const newMrp = {...plan, numberOfPeriods: numberOfPeriods};
        const newTestComponent = {...plan.mrpComponents[0],numberOfPeriods:numberOfPeriods}
        newMrp.mpsPeriods = newMrp.mpsPeriods.slice(0, numberOfPeriods);
        while (newMrp.mpsPeriods.length < numberOfPeriods) {
            newMrp.mpsPeriods.push(new MPSPeriod());
        }

        // Recalculate the plan
        setPlan(recalculate(newMrp));

       // const newcomponent = {... component,numberOfPeriods: numberOfPeriods};
    }

    return (
        <>
            <div className="flex gap-5">
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Number of periods
                    <input type="number" className="grow min-w-10"
                           value={plan.numberOfPeriods.toString() || 0}
                           onChange={handleNumberOfPeriodsChange}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    On hand
                    <input type="number" className="grow min-w-10"
                           value={plan.onHand.toString() || 0}
                           onChange={(e) => {
                               const newMrp = JSON.parse(JSON.stringify(plan));
                               newMrp.onHand = parseInt(e.target.value) || 0;
                               setPlan(recalculate(newMrp));
                           }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Lot size
                    <input type="number" className="grow min-w-10"
                           value={plan.lotSize.toString() || 0}
                           onChange={(e) => {
                               const newMrp = JSON.parse(JSON.stringify(plan));
                               newMrp.lotSize = parseInt(e.target.value) || 0;
                               setPlan(recalculate(newMrp));
                           }}
                    />
                </label>
            </div>
            <div className="flex gap-5 pt-5">
                <label>
                    <a className="text-xl pr-5">Automatic MSP production calculation</a>
                    <input
                        type="checkbox"
                        onChange={(e) => {
                            const newMrp = JSON.parse(JSON.stringify(plan));
                            newMrp.automaticMSPCalculations = !newMrp.automaticMSPCalculations
                            setPlan(recalculate(newMrp));
                        }}/>
                </label>
            </div>
        </>
    );
}
