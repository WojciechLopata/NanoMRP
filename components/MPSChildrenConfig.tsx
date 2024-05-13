import Plan from "@/models/plan";
import MPSTable from "@/components/MPSTable";
import MPSConfig from "@/components/MPSConfig";
import MPSChildren from "@/components/MPSChildren";
import MRPComponent from "@/models/MRPComponent";
import {recalculateComponent} from "@/lib/recalculate";

export default function MPSChildrenConfig(props: {
    plan: Plan,
    setPlan: (plan: Plan) => void
    component: MRPComponent,
    handleComponentChange: (newComponent: MRPComponent, index: number) => void
    index: number
}) {
    const {plan, setPlan, component, handleComponentChange, index} = props;

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
                            const newComponent = {...component, onHand: parseInt(e.target.value) || 0};
                            handleComponentChange(newComponent, index);
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
                            const newComponent = {...component, lotSize: parseInt(e.target.value) || 0};
                            handleComponentChange(newComponent, index);
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
                            const newComponent = {...component, leadTime: parseInt(e.target.value) || 0};
                            handleComponentChange(newComponent, index);
                        }}
                    />
                </label>

            </div>
        </>
    );
}
