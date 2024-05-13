import Plan from "@/models/plan";


export default function MPS(props: {
    plan: Plan,
    recalculatePlan: (plan: Plan) => void
}) {
    const {plan, recalculatePlan} = props;

    return (
        <div className="overflow-x-scroll">
            <table className="table table-pin-cols">
                <tbody>
                <tr>
                    <th className="bg-transparent">Week</th>
                    {plan.mpsPeriods.map((mpsPeriod, index) => (
                        <td className="text-center" key={index}>{index + 1}</td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Projected demand
                    </th>
                    {plan.mpsPeriods.map((mpsPeriod, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.projectedDemand ? "opacity-50" : ""} focus:opacity-100`}
                                   value={mpsPeriod.projectedDemand.toString() || 0}
                                   onChange={(e) => {
                                       const newPlan = JSON.parse(JSON.stringify(plan));
                                       newPlan.mpsPeriods[index].projectedDemand = parseInt(e.target.value) || 0;
                                       recalculatePlan(newPlan);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Production
                    </th>
                    {plan.mpsPeriods.map((mpsPeriod, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.production ? "opacity-50" : ""} focus:opacity-100 `}
                                   value={mpsPeriod.production.toString() || 0}
                                   onChange={(e) => {
                                       const newPlan = JSON.parse(JSON.stringify(plan));
                                       newPlan.mpsPeriods[index].production = parseInt(e.target.value) || 0;
                                       recalculatePlan(newPlan);
                                   }}
                                   readOnly={plan.automaticMSPCalculations}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Available
                    </th>
                    {plan.mpsPeriods.map((mpsPeriod, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.available ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                                   value={mpsPeriod.available.toString() || 0}
                                   readOnly={true}
                            />
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
