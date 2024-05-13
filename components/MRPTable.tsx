import MRPComponent from "@/models/MRPComponent";

export default function MRPTable(props: {
    component: MRPComponent,
    componentIndex: number,
    recalculatePlanByComponent: (component: any) => void,
}) {
    const {component, recalculatePlanByComponent} = props;



    return (
        <div className="overflow-x-scroll">
            <table className="table table-pin-cols">
                <tbody>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Week
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td className="text-center" key={index}>{index + 1}</td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Gross requirements
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.grossRequirements ? "opacity-50" : ""} focus:opacity-100`}
                                   value={mrpPeriods.grossRequirements.toString() || 0}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].grossRequirements = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Scheduled receipts
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.scheduledReceipts ? "opacity-50" : ""} focus:opacity-100 `}
                                   value={mrpPeriods.scheduledReceipts.toString() || 0}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].scheduledReceipts = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Projected on hand
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.projectedOnHand ? "opacity-50" : ""} focus:opacity-100`}
                                   value={mrpPeriods.projectedOnHand.toString() || 0}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].projectedOnHand = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Net requirements
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.netRequirements ? "opacity-50" : ""} focus:opacity-100 `}
                                   value={mrpPeriods.netRequirements.toString() || 0}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].netRequirements = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Planned order releases
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReleases ? "opacity-50" : ""} focus:opacity-100 `}
                                   value={mrpPeriods.plannedOrderReleases.toString() || 0}
                                   readOnly={true}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].plannedOrderReleases = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                <tr>
                    <th className="bg-transparent z-10 backdrop-blur bg-gradient-to-r from-base-300">
                        Planned order receipts
                    </th>
                    {component.mrpPeriods.map((mrpPeriods, index) => (
                        <td key={index}>
                            <input type="number"
                                   className={`input input-bordered w-full min-w-24 transition ${!mrpPeriods.plannedOrderReceipts ? "opacity-50" : ""} focus:opacity-100 `}
                                   value={mrpPeriods.plannedOrderReceipts.toString() || 0}
                                   readOnly={true}
                                   onChange={(e) => {
                                       component.mrpPeriods[index].plannedOrderReceipts = parseInt(e.target.value) || 0;
                                       recalculatePlanByComponent(component);
                                   }}
                            />
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
        </div>
    );
}
