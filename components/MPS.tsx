import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import MPSConfig from "@/components/MPSConfig";
import MPSChildren from "@/components/MPSChildren";

export default function MPS(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void
}) {
    const {plan, setPlan} = props;

    return (
        <>
            <MPSConfig plan={plan} setPlan={setPlan}/>
            <MPSTable plan={plan} setPlan={setPlan}/>
            <MPSChildren plan={plan} setPlan={setPlan}/>
        </>
    );
}
