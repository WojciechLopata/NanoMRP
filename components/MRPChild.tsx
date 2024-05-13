import MRPComponent from "@/models/MRPComponent";
import MRPTable from "@/components/MRPTable";
import MRPConfig from "@/components/MRPConfig";

export default function MRPChild(props: {
    component: MRPComponent,
    componentIndex: number,
    recalculatePlanByComponent: (component: any) => void,
}) {
    const {component, componentIndex, recalculatePlanByComponent} = props;

    return (
        <>
            <h2 className="pt-5 pb-10 text-2xl font-bold">{component.name}</h2>
            <MRPConfig component={component} recalculatePlanByComponent={recalculatePlanByComponent}/>
            <MRPTable component={component} componentIndex={componentIndex} recalculatePlanByComponent={recalculatePlanByComponent}/>
            <div className={"ml-10"}>
                {component.children.map((component_child, index) => (
                    <MRPChild component={component_child} componentIndex={index} recalculatePlanByComponent={recalculatePlanByComponent} key={component_child.name + index.toString()}/>
                ))}
            </div>

        </>
    );
}
