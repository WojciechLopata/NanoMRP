'use client';

import {ChangeEvent, useState} from "react";
import {saveAs} from 'file-saver';
import MPS from "@/components/MPS";
import Plan from "@/models/plan";
import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";
import recalculate, {recalculateComponent} from "@/lib/recalculate";
import Hero from "@/components/Hero";
import debounce from "debounce";

export default function Home() {
    const [componentIndex, setComponentIndex] = useState(null);

    const handleExport = () => {
        const json = JSON.stringify(plan, null, 2);
        const blob = new Blob([json], {type: "application/json"});
        saveAs(blob, 'plan.json');
    };

    const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // @ts-ignore
                const json = e.target.result as string;
                const plan = JSON.parse(json);
                setPlan(plan);
            };
            reader.readAsText(file);

            // @ts-ignore
            document.getElementById('export-import-modal').close();
        }
    };

    // Default number of periods in the Master Production Schedule and all the components
    const DEFAULT_NUMBER_OF_PERIODS = 10;
    const components: MRPComponent[] = [
        new MRPComponent(
            "Headband",
            1,
            3,
            40,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            []
        ),
        new MRPComponent(
            "Earcup",
            2,
            2,
            120,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            [new MRPComponent(
                "Speaker",
                1,
                3,
                70,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            ), new MRPComponent(
                "Foam",
                1,
                3,
                50,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            ), new MRPComponent(
                "Enclosure",
                1,
                3,
                50,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                [])]
        ), new MRPComponent(
            "Audio cable",
            1,
            2, 30, 20, DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            [new MRPComponent(
                "Wire",
                1, 1, 50, 10, DEFAULT_NUMBER_OF_PERIODS, Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()), []),
                new MRPComponent(
                    "Connector",
                    2, 1, 50, 10, DEFAULT_NUMBER_OF_PERIODS, Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()), []
                )]
        )];

    const [plan, setPlan] = useState(
        new Plan(
            DEFAULT_NUMBER_OF_PERIODS,
            0,
            Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MPSPeriod()),
            components
        )
    );

    // Set debounce time
    const DEBOUNCE_TIME = 3000;

    const recalculatePlan = (plan: Plan) => {
        debounce(() => {
            const newMrp = JSON.parse(JSON.stringify(plan));
            setPlan(recalculate(newMrp));
        }, DEBOUNCE_TIME)();
    }

    const recalculatePlanByComponent = (component: MRPComponent) => {
        debounce(() => {

            component.mrpPeriods = recalculateComponent(component, plan.allowAddingReceipts).mrpPeriods;
            recalculatePlan(plan);
        }, DEBOUNCE_TIME)();
    }

    return (
        <div>
            <Hero/>

            <main className="p-5 sm:p-10">
                <div>
                </div>
                <MPS plan={plan} recalculatePlan={recalculatePlan}
                     recalculatePlanByComponent={recalculatePlanByComponent} componentIndex={componentIndex}
                     setComponentIndex={setComponentIndex}/>
            </main>

            <dialog id="export-import-modal" className="modal">
                <div className="modal-box">
                    <h2 className="font-bold text-lg">Export & import</h2>
                    <p className="py-4">
                        You can export and import your data in the JSON format to use it later, back up your simulations
                        or share it with others.
                    </p>
                    <div className="flex flex-col w-full lg:flex-row">
                        <div className="grid flex-grow h-24 card rounded-box place-items-center">
                            <button
                                onClick={handleExport}
                                className="btn btn-neutral w-full h-full"
                            >
                                Export
                            </button>
                        </div>
                        <div className="divider lg:divider-horizontal">OR</div>
                        <div className="grid flex-grow h-24 card rounded-box place-items-center">
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full h-full"
                                accept=".json"
                                onChange={handleImport}
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="w-full">
                            <button className="btn w-full">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
