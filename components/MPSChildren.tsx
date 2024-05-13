import Plan from "@/models/plan";
import MRPStuff from "@/components/mrp";
import {recalculateComponent} from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";

export default function MPSChildren(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void
}) {
    const {plan, setPlan} = props;

    const handleComponentChange = (newComponent: MRPComponent, index: number) => {
        // Create a new copy of the mrp state
        const newMrp = JSON.parse(JSON.stringify(plan));

        // Replace the component at the given index with the new component
        newMrp.mrpComponents[index] = newComponent;

        // Recalculate the MRP values for the new component
        newMrp.mrpComponents[index] = recalculateComponent(newMrp.mrpComponents[index]);

        // Set the new MRP state
        setPlan(newMrp);
    };
    function setComponent(component: MRPComponent): void {

        handleComponentChange(component,0)
    }

    return (
        <section>
            {plan.mrpComponents.map((component, index) => (
                <div key={index}>
                    <h2 className="pt-5 pb-10 text-2xl font-bold text-white">{component.name}</h2>
                    <div className="flex gap-5">
                        <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                            On hand
                            <input
                                type="number"
                                className="grow min-w-10"
                                value={component.onHand.toString() || 0}
                                onChange={(e) => {
                                    const newComponent = { ...component, onHand: parseInt(e.target.value) || 0 };
                                    handleComponentChange(newComponent, index);
                                }}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                            Lot size
                            <input
                                type="number"
                                className="grow min-w-10"
                                value={component.lotSize.toString() || 0}
                                onChange={(e) => {
                                    const newComponent = { ...component, lotSize: parseInt(e.target.value) || 0 };
                                    handleComponentChange(newComponent, index);
                                }}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                            Realization time
                            <input
                                type="number"
                                className="grow min-w-10"
                                value={component.leadTime.toString() || 0}
                                onChange={(e) => {
                                    const newComponent = { ...component, leadTime: parseInt(e.target.value) || 0 };
                                    handleComponentChange(newComponent, index);
                                }}
                            />
                        </label>

                    </div>
                    <MRPStuff component={component} setComponent={setComponent} />
                    {component.children.map((component_child,index)=>(
                            <div key="index" className="py-10">
                                <h3 className="pt-5 pb-10 text-2xl font-bold text-white">{component_child.name}</h3>
                                <div>
                                    <a>MIEJSCE NA TABELKE</a>
                                </div>
                            </div>
                        ))}
                    </div>
                    ))}
        </section>
    );
}
