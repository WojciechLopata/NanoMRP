import Plan from "@/models/plan";
import {ChangeEvent} from "react";
import MPSPeriod from "@/models/MPSPeriod";

export default function MPSConfig(props: {
    plan: Plan,
    recalculatePlan: (plan: Plan) => void
}) {
    const {plan, recalculatePlan} = props;

    const handleNumberOfPeriodsChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get the new number of periods
        const numberOfPeriods = parseInt(e.target.value) || 0;

        // Update the number of periods
        plan.numberOfPeriods = numberOfPeriods
        plan.mpsPeriods = plan.mpsPeriods.slice(0, numberOfPeriods);
        while (plan.mpsPeriods.length < numberOfPeriods) {
            plan.mpsPeriods.push(new MPSPeriod());
        }

        // Recalculate the plan
        recalculatePlan(plan);
    }

    return (
        <>
            <div className="flex gap-5 bg-base-200 p-5 rounded-xl flex-wrap">
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
                               plan.onHand = parseInt(e.target.value) || 0;
                               recalculatePlan(plan);
                           }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Lot size
                    <input type="number" className="grow min-w-10"
                           value={plan.lotSize.toString() || 0}
                           onChange={(e) => {
                               plan.lotSize = parseInt(e.target.value) || 0;
                               recalculatePlan(plan);
                           }}
                    />
                </label>
                <label className="flex items-center border border-1 border-base-content/20 bg-base-100 py-2 px-3 rounded-lg">
                    <a className="text-xl pr-3">Automatic calculation</a>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={plan.automaticMSPCalculations}
                        onChange={() => {
                            plan.automaticMSPCalculations = !plan.automaticMSPCalculations
                            recalculatePlan(plan);
                        }}/>
                </label>
                <label
                    className="flex items-center border border-1 border-base-content/20 bg-base-100 py-2 px-3 rounded-lg">
                    <a className="text-xl pr-3">Allow adding receipts</a>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={plan.allowAddingReceipts}
                        onChange={() => {
                            plan.allowAddingReceipts = !plan.allowAddingReceipts
                            recalculatePlan(plan);
                        }}/>
                </label>
            </div>
        </>
    );
}
