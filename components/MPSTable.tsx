import Plan from "@/models/plan";
import recalculate from "@/lib/recalculate";


export default function MPS(props: {
    plan: Plan,
    recalculatePlan: (plan: Plan) => void
}) {
    const {plan, recalculatePlan} = props;

    return (
        <table className="table table-pin-cols my-10">
            <tbody>
            <tr>
                <th>Week</th>
                {plan.mpsPeriods.map((mpsPeriod, index) => (
                    <td className="text-center" key={index}>{index + 1}</td>
                ))}
            </tr>
            <tr>
                <th>Projected demand</th>
                {plan.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="number"
                            className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.projectedDemand ? "opacity-50" : ""} focus:opacity-100`}
                            value={mpsPeriod.projectedDemand.toString() || 0}
                            onChange={(e) => {
                                plan.mpsPeriods[index].projectedDemand = parseInt(e.target.value) || 0;
                                recalculatePlan(plan)
                            }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Production</th>
                {plan.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="text"
                            className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.production ? "opacity-50" : ""} focus:opacity-100 `}
                            value={mpsPeriod.production.toString() || 0}
                            onChange={(e) => {
                                plan.mpsPeriods[index].production = parseInt(e.target.value) || 0;
                                recalculatePlan(plan)
                            }}
                            readOnly={plan.automaticMSPCalculations}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Available</th>
                {plan.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="text"
                            className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.available ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                            value={mpsPeriod.available.toString() || 0}
                            readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
}
