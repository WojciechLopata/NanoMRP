import Plan from "@/models/plan";
import MRPStuff from "@/components/MRPChild";
import {recalculateComponent} from "@/lib/recalculate";
import MRPComponent from "@/models/MRPComponent";
import MRPConfig from "@/components/MRPConfig";
import MRPChild from "@/components/MRPChild";
import {SetStateAction, useState} from "react";

export default function MRP(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void,
    componentIndex: any,
    setComponentIndex: (index: any) => void
}) {
    const {plan, setPlan, componentIndex, setComponentIndex} = props;

    const handleComponentChange = (newComponent: MRPComponent, index: number) => {
        console.log("index is "+index);
        setComponentIndex(index);
        // Create a new copy of the mrp state
        const newMrp = JSON.parse(JSON.stringify(plan));

        // Replace the component at the given index with the new component
        newMrp.mrpComponents[index] = newComponent;

        // Recalculate the MRP values for the new component
        newMrp.mrpComponents[index] = recalculateComponent(newMrp.mrpComponents[index]);
        setPlan(newMrp);
    };

    function setComponent(component: MRPComponent, index: number, childIndex?: number): void {
        if (childIndex !== undefined) {
            const newMrp = JSON.parse(JSON.stringify(plan));
            newMrp.mrpComponents[index].children[childIndex] = component;
            // Update child component
            setPlan(newMrp);
        } else {
            // Update component
            handleComponentChange(component, index);
        }
    }

    return (
        <section>
            {plan.mrpComponents.map((mrpComponent, index) => (
                <MRPChild component={mrpComponent} setComponent={setComponent} componentIndex={index} key={mrpComponent.name + index.toString()}/>
            ))}
        </section>
    );
}
