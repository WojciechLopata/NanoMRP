import recalculate from "@/lib/recalculate";
import { recalculateComponent } from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";

export default function MRPStuff(props: {
    component: MRPComponent,
    componentIndex: number,
    setComponent: (component: MRPComponent,componentIndex) => void
}) {
    const {component, setComponent, componentIndex} = props;
  

    return (
       
        <table className="table table-pin-cols my-10">
        
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
                                setComponent(recalculateComponent(newcomponent),componentIndex);
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
                                setComponent(recalculateComponent(newcomponent),componentIndex);
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
               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.projectedOnHand ? "opacity-50" : ""} focus:opacity-100`}
               value={mrpPeriods.projectedOnHand.toString() || 0}
               onChange={(e) => {
                    const newcomponent = JSON.parse(JSON.stringify(component));
                    newcomponent.mrpPeriods[index].projectedOnHand = parseInt(e.target.value) || 0;
                    setComponent(recalculateComponent(newcomponent),componentIndex);
                }}
        />
    </td>
))}
            </tr>
            <tr>
                <th>netRequirements</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.netRequirements ? "opacity-50" : ""} focus:opacity-100 `}
                               value={mrpPeriods.netRequirements.toString() || 0}
                               onChange={(e) => {
                                    const newcomponent = JSON.parse(JSON.stringify(component));
                                    newcomponent.mrpPeriods[index].netRequirements = parseInt(e.target.value) || 0;
                                    console.log("wpisywanie prod ", newcomponent.mrpPeriods[index].netRequirements)
                                    setComponent(recalculateComponent(newcomponent), componentIndex);
                                }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>plannedOrderReleases</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReleases ? "opacity-50" : ""} focus:opacity-100 `}
                               value={mrpPeriods.plannedOrderReleases.toString() || 0}
                               readOnly={true}
                               onChange={(e) => {
                                const newcomponent = JSON.parse(JSON.stringify(component));
                                newcomponent.mrpPeriods[index].plannedOrderReleases = parseInt(e.target.value) || 0;
                                console.log("wpisywanie prod ", newcomponent.mrpPeriods[index].plannedOrderReleases)
                                setComponent(recalculateComponent(newcomponent),componentIndex);
                            }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>plannedOrderReceipts</th>
                {component.mrpPeriods.map((mrpPeriods, index) => (
                    <td key={index}>
                        <input type="text"
                               className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReceipts ? "opacity-50" : ""} focus:opacity-100 `}
                               value={mrpPeriods.plannedOrderReceipts.toString() || 0}
                               readOnly={true}
                               onChange={(e) => {
                                const newcomponent = JSON.parse(JSON.stringify(component));
                                newcomponent.mrpPeriods[index].plannedOrderReceipts = parseInt(e.target.value) || 0;
                                console.log("wpisywanie prod ", newcomponent.mrpPeriods[index].plannedOrderReceipts)
                                setComponent(recalculateComponent(newcomponent),componentIndex);
                            }}
                        />
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
}
