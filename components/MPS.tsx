import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import MPSConfig from "@/components/MPSConfig";
import MRP from "@/components/MRP";

export default function MPS(props: {
    plan: Plan,
    recalculatePlan: (plan: Plan) => void,
    recalculatePlanByComponent: (component: any) => void,
    componentIndex: any,
    setComponentIndex: (index: any) => void
}) {
    const {plan, recalculatePlan, recalculatePlanByComponent} = props;

    return (
        <>
            <MPSConfig plan={plan} recalculatePlan={recalculatePlan}/>
            <MPSTable plan={plan} recalculatePlan={recalculatePlan}/>
            <MRP plan={plan} recalculatePlanByComponent={recalculatePlanByComponent}/>
        </>
    );
}
