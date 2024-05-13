import MRPComponent from "@/models/MRPComponent";

export default function MRPConfig(props: {
    component: MRPComponent,
    recalculatePlanByComponent: (component: any) => void,
}) {
    const {component, recalculatePlanByComponent} = props;

    return (
        <>
            <div className="flex gap-5">
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    On hand
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.onHand.toString() || 0}
                        onChange={(e) => {
                            component.onHand = parseInt(e.target.value) || 0;
                            recalculatePlanByComponent(component);
                        }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Lot size
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.lotSize.toString() || 0}
                        onChange={(e) => {
                            component.lotSize = parseInt(e.target.value) || 0;
                            recalculatePlanByComponent(component);
                        }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Realization time
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.leadTime.toString() || 0}
                        onChange={(e) => {
                            component.leadTime = parseInt(e.target.value) || 0;
                            recalculatePlanByComponent(component);
                        }}
                    />
                </label>

            </div>
        </>
    );
}
