import Plan from "@/models/plan";
import MRPChild from "@/components/MRPChild";

export default function MRP(props: {
    plan: Plan,
    recalculatePlanByComponent: (component: any) => void,
}) {
    const {plan, recalculatePlanByComponent} = props;

    return (
        <section>
            {plan.mrpComponents.map((mrpComponent, index) => (
                <MRPChild component={mrpComponent} componentIndex={index} recalculatePlanByComponent={recalculatePlanByComponent} key={mrpComponent.name + index.toString()}/>
            ))}
        </section>
    );
}
