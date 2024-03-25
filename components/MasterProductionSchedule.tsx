import Plan from "@/models/plan";
import recalculate from "@/lib/recalculate";

export default function MasterProductionSchedule(props: {
    mrp: Plan,
    setMrp: (mrp: Plan) => void
}) {
    const {mrp, setMrp} = props;

    return (
        <table className="table table-pin-cols">
            <tbody>
            <tr>
                <th>Week</th>
                {mrp.mpsPeriods.map((mpsPeriod, index) => (
                    <td className="text-center" key={index}>{index + 1}</td>
                ))}
            </tr>
            <tr>
                <th>Projected demand</th>
                {mrp.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.projectedDemand ? "opacity-50" : ""} focus:opacity-100`}
                               value={mpsPeriod.projectedDemand.toString() || 0}
                               onChange={(e) => {
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.mpsPeriods[index].projectedDemand = parseInt(e.target.value) || 0;
                                   setMrp(recalculate(newMrp));
                               }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Production</th>
                {mrp.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.production ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                               value={mpsPeriod.production.toString() || 0}
                               readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Available</th>
                {mrp.mpsPeriods.map((mpsPeriod, index) => (
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
