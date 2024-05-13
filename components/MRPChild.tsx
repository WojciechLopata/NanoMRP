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
            <div className="bg-base-100 px-5 py-3 rounded-t-xl">
                <h2 className="text-2xl font-bold">{component.name}</h2>
            </div>
            <MRPConfig component={component} recalculatePlanByComponent={recalculatePlanByComponent}/>
            <MRPTable component={component} componentIndex={componentIndex}
                      recalculatePlanByComponent={recalculatePlanByComponent}/>
            <div className="ml-4 pl-6 border-l-2 border-neutral-content/75">
                {component.children.map((component_child, index) => (
                    <div className="mt-10" key={index}>
                        <MRPChild component={component_child} componentIndex={index}
                                  recalculatePlanByComponent={recalculatePlanByComponent}
                                  key={component_child.name + index.toString()}/>
                    </div>
                ))}
            </div>
        </>
    );
}
