import Plan from "@/models/plan";
import MRPStuff from "@/components/MRPChildren";
import {recalculateComponent} from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";
import MRPConfig from "@/components/MRPConfig";
import MRPChildren from "@/components/MRPChildren";
import {SetStateAction, useState} from "react";

export default function MRP(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void,
    componentIndex: any,
    setComponentIndex: (index: any) => void
}) {
    const {plan, setPlan, componentIndex, setComponentIndex} = props;

    const handleComponentChange = (newComponent: MRPComponent, index: string) => {
        setPlan((currentMrp: any) => {
            console.log("index is "+index)
            setComponentIndex(index);
            // Create a new copy of the mrp state
            const newMrp = JSON.parse(JSON.stringify(currentMrp));

            // Replace the component at the given index with the new component
            newMrp.mrpComponents[index] = newComponent;

            // Recalculate the MRP values for the new component
            newMrp.mrpComponents[index] = recalculateComponent(newMrp.mrpComponents[index]);

            // Return the new MRP state
            return newMrp;
        });
    };

    function setComponent(component: MRPComponent, index: string, childIndex?: string | number | undefined): void {
        if (childIndex !== undefined) {
            // Update child component
            setPlan((currentMrp) => {
                const newMrp = JSON.parse(JSON.stringify(currentMrp));
                newMrp.mrpComponents[index].children[childIndex] = component;
                return newMrp;
            });
        } else {
            // Update component
            handleComponentChange(component, index);
        }
    }

    return (
        <section>
            {plan.mrpComponents.map((component, index) => (
                <div key={component.name + index.toString()}>
                    <h2 className="pt-5 pb-10 text-2xl font-bold">{component.name}</h2>
                    <MRPConfig plan={plan} setPlan={setPlan} component={component} handleComponentChange={handleComponentChange} index={index}/>
                    <MRPChildren component={component} setComponent={setComponent} componentIndex={index} />
                    {component.children.map((component_child,index)=>(
                            <div key={component_child.name} className="py-10">
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
