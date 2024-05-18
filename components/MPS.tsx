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
            <div className="bg-base-300 p-5 rounded-2xl">
                <h2 className="mb-5 text-3xl font-bold">Master Production Schedule</h2>
                <MPSConfig plan={plan} recalculatePlan={recalculatePlan}/>
                <MPSTable plan={plan} recalculatePlan={recalculatePlan}/>
            </div>
            <MRP plan={plan} recalculatePlanByComponent={recalculatePlanByComponent}/>
        </>
    );
}
