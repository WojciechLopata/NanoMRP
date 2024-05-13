import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import MPSConfig from "@/components/MPSConfig";
import MRP from "@/components/MRP";
import MRPComponent from "@/models/MRPComponent";
import recalculate, {recalculateComponent} from "@/lib/recalculate";

export default function MRPConfig(props: {
    component: MRPComponent,
    index: number,
    plan: Plan,
    setPlan: (plan: Plan) => void,
}) {
    const {component, index, plan, setPlan} = props;

    return (
        <>
            <div className="flex gap-5">
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    On hand
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.onHand.toString() || 0}
                        onChange={(e) => {
                            component.onHand = parseInt(e.target.value) || 0;
                            component.mrpPeriods = recalculateComponent(component).mrpPeriods;
                            const newMrp = JSON.parse(JSON.stringify(plan));
                            setPlan(recalculate(newMrp));
                        }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Lot size
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.lotSize.toString() || 0}
                        onChange={(e) => {
                            component.lotSize = parseInt(e.target.value) || 0;
                            component.mrpPeriods = recalculateComponent(component).mrpPeriods;
                            const newMrp = JSON.parse(JSON.stringify(plan));
                            setPlan(recalculate(newMrp));
                        }}
                    />
                </label>
                <label
                    className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                    Realization time
                    <input
                        type="number"
                        className="grow min-w-10"
                        value={component.leadTime.toString() || 0}
                        onChange={(e) => {
                            component.leadTime = parseInt(e.target.value) || 0;
                            component.mrpPeriods = recalculateComponent(component).mrpPeriods;
                            const newMrp = JSON.parse(JSON.stringify(plan));
                            setPlan(recalculate(newMrp));
                        }}
                    />
                </label>

            </div>
        </>
    );
}
