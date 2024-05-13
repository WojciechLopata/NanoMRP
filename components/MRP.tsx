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

    return (
        <section>
            {plan.mrpComponents.map((mrpComponent, index) => (
                <MRPChild component={mrpComponent} componentIndex={index} plan={plan} setPlan={setPlan} key={mrpComponent.name + index.toString()}/>
            ))}
        </section>
    );
}
