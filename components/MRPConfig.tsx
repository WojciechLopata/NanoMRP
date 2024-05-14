import MRPComponent from "@/models/MRPComponent";

export default function MRPConfig(props: {
    component: MRPComponent,
    recalculatePlanByComponent: (component: any) => void,
}) {
    const {component, recalculatePlanByComponent} = props;

    return (
        <>
            <div className="flex gap-5 bg-base-200 p-5 mb-5 rounded-b-xl flex-wrap">
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
                <label
                    className="flex items-center border border-1 border-base-content/20 bg-base-100 py-2 px-3 rounded-lg">
                    <a className="text-xl pr-3">Manual mode</a>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={!(component.automaticChildCalculation)}
                        onChange={() => {
                            component.automaticChildCalculation = !component.automaticChildCalculation

                            // {console.log("test",component.automaticChildCalculation)}
                            recalculatePlanByComponent(component);
                        }}/>
                </label>


            </div>
        </>
    );
}
