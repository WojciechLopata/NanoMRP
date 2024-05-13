import MRPComponent from "@/models/MRPComponent";
import MRPTable from "@/components/MRPTable";
import MRPConfig from "@/components/MRPConfig";
import Plan from "@/models/plan";

export default function MRPChild(props: {
    component: MRPComponent,
    componentIndex: number,
    plan: Plan,
    setPlan: (plan: Plan) => void,
}) {
    const {component, componentIndex, plan, setPlan} = props;

    return (
        <>
            <h2 className="pt-5 pb-10 text-2xl font-bold">{component.name}</h2>
            <MRPConfig component={component} index={componentIndex} plan={plan} setPlan={setPlan}/>
            <MRPTable component={component} componentIndex={componentIndex} plan={plan} setPlan={setPlan}/>
            <div className={"ml-10"}>
                {component.children.map((component_child, index) => (
                    <MRPChild component={component_child} componentIndex={index} plan={plan} setPlan={setPlan} key={component_child.name + index.toString()}/>
                ))}
            </div>

        </>
    );
}
