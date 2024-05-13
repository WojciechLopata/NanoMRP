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
                <div className="bg-base-300 p-5 rounded-2xl mt-5 sm:mt-10" key={index}>
                    <MRPChild component={mrpComponent} componentIndex={index}
                              recalculatePlanByComponent={recalculatePlanByComponent}
                              key={mrpComponent.name + index.toString()}/>
                </div>
            ))}
        </section>
    );
}
