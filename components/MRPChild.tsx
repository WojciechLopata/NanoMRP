import MRPComponent from "@/models/MRPComponent";
import MRPTable from "@/components/MRPTable";
import MRPConfig from "@/components/MRPConfig";

export default function MRPChild(props: {
    component: MRPComponent,
    componentIndex: number,
    childIndex?: number,
    setComponent: (component: MRPComponent, componentIndex: number, childIndex?: number) => void
}) {
    const {component, setComponent, componentIndex} = props;
  

    return (
        <>
            <h2 className="pt-5 pb-10 text-2xl font-bold">{component.name}</h2>
            <MRPConfig component={component} setComponent={setComponent} index={componentIndex}/>
            <MRPTable component={component} componentIndex={componentIndex} setComponent={setComponent}/>
            <div className={"ml-10"}>
                {component.children.map((component_child, index) => (
                    <MRPChild component={component_child} componentIndex={index} setComponent={setComponent} key={component_child.name + index.toString()}/>
                ))}
            </div>

        </>
    );
}
