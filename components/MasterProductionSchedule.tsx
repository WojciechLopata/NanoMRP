import Mrp from "@/models/mrp";
import recalculate from "@/lib/recalculate";

export default function MasterProductionSchedule(props: {
    mrp: Mrp,
    setMrp: (mrp: Mrp) => void
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
                <th>Demand</th>
                {mrp.mpsPeriods.map((mpsPeriod, index) => (
                    <td key={index}>
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.forecastedDemand ? "opacity-50" : ""} focus:opacity-100`}
                               value={mpsPeriod.forecastedDemand.toString() || 0}
                               onChange={(e) => {
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.mpsPeriods[index].forecastedDemand = parseInt(e.target.value) || 0;
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
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!mpsPeriod.production ? "opacity-50" : ""} focus:opacity-100`}
                               value={mpsPeriod.production.toString() || 0}
                               onChange={(e) => {
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.mpsPeriods[index].production = parseInt(e.target.value) || 0;
                                   setMrp(recalculate(newMrp));
                               }}
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
