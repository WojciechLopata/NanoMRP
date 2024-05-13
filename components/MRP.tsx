import Plan from "@/models/plan";
import MRPStuff from "@/components/MRPChildren";
import {recalculateComponent} from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";
import MRPConfig from "@/components/MRPConfig";

export default function MRP(props: {
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
                    <h2 className="pt-5 pb-10 text-2xl font-bold">{component.name}</h2>
                    <MRPConfig plan={plan} setPlan={setPlan} component={component} handleComponentChange={handleComponentChange} index={index}/>
                    <MRPStuff component={component} setComponent={setComponent} />
                    {component.children.map((component_child,index)=>(
                            <div key="index" className="py-10">
                                <h3 className="pt-5 pb-10 text-2xl font-bold ">{component_child.name}</h3>
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
