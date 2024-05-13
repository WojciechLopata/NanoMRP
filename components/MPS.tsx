import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import MPSConfig from "@/components/MPSConfig";
import MRP from "@/components/MRP";

export default function MPS(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void,
    componentIndex: any,
    setComponentIndex: (index: any) => void
}) {
    const {plan, setPlan, componentIndex, setComponentIndex} = props;

    return (
        <>
            <MPSConfig plan={plan} setPlan={setPlan}/>
            <MPSTable plan={plan} setPlan={setPlan}/>
            <MRP plan={plan} setPlan={setPlan} componentIndex={componentIndex} setComponentIndex={setComponentIndex}/>
        </>
    );
}
