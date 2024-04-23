import recalculate from "@/lib/recalculate";
import { recalculateComponent } from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";

export default function MRPStuff(props: {
    component: MRPComponent,
    
    setComponent: (component: MRPComponent) => void
}) {
    const {component, setComponent} = props;

    return (
       
        <table className="table table-pin-cols">
        
            <tbody>
            <tr>
                <th>Week</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td className="text-center" key={index}>{index + 1}</td>
                ))}
            </tr>
            <tr>
                <th>Gross Requirements</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.grossRequirements ? "opacity-50" : ""} focus:opacity-100`}
                               value={mrpPeriods.grossRequirements.toString() || 0}
                               onChange={(e) => {
                                const newcomponent = JSON.parse(JSON.stringify(component));
                                newcomponent.mrpPeriods[index].grossRequirements = parseInt(e.target.value) || 0;
                                console.log(newcomponent)
                                setComponent(recalculateComponent(newcomponent));
                               /// console.log(component)
                            }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>scheduled Receipts</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.scheduledReceipts ? "opacity-50" : ""} focus:opacity-100 `}
                               value={mrpPeriods.scheduledReceipts.toString() || 0}
                               onChange={(e) => {
                                const newcomponent = JSON.parse(JSON.stringify(component));
                                newcomponent.mrpPeriods[index].scheduledReceipts = parseInt(e.target.value) || 0;
                                console.log("wpisywanie prod ", newcomponent.mrpPeriods[index].scheduledReceipts)
                                setComponent(recalculateComponent(newcomponent));
                            }}
                               
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>projectedOnHand</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.projectedOnHand ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                               value={mrpPeriods.projectedOnHand.toString() || 0}
                               readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>netRequirements</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.netRequirements ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                               value={mrpPeriods.netRequirements.toString() || 0}
                               readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>plannedOrderReleases</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReleases ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                               value={mrpPeriods.plannedOrderReleases.toString() || 0}
                               readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>plannedOrderReceipts</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReceipts ? "opacity-50" : ""} focus:opacity-100 pointer-events-none`}
                               value={mrpPeriods.plannedOrderReceipts.toString() || 0}
                               readOnly={true}
                        />
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
}
