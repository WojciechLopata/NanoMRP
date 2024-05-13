'use client';

import {ChangeEvent, Component, useState} from "react";
import { saveAs } from 'file-saver';
import MPS from "@/components/MPS";
import Plan from "@/models/plan";
import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";
import recalculate, {recalculateComponent} from "@/lib/recalculate";
import Hero from "@/components/Hero";

export default function Home() {
    const [componentIndex, setComponentIndex] = useState(null);
    const handleExport = () => {
        const json = JSON.stringify(plan);
        const blob = new Blob([json], {type: "application/json"});
        saveAs(blob, 'plan.json');
      };
      const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const json = e.target.result as string;
            const plan = JSON.parse(json);
            setPlan(plan);
          };
          reader.readAsText(file);
        }
      };
    

    // Default number of periods in the Master Production Schedule and all the components
    const DEFAULT_NUMBER_OF_PERIODS = 7;
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

    const recalculatePlan = (plan: Plan) => {
        const newMrp = JSON.parse(JSON.stringify(plan));
        setPlan(recalculate(newMrp));
    }

    const recalculatePlanByComponent = (component: MRPComponent) => {
        component.mrpPeriods = recalculateComponent(component, plan.allowAddingReceipts).mrpPeriods;
        recalculatePlan(plan);
    }

    return (
        <div>
            <Hero/>
            <main className="p-5 sm:p-10">
            <button onClick={handleExport}>Export Plan</button>
                <input type="file" accept=".json" onChange={handleImport} />
                <MPS plan={plan} recalculatePlan={recalculatePlan}
                     recalculatePlanByComponent={recalculatePlanByComponent} componentIndex={componentIndex}
                     setComponentIndex={setComponentIndex}/>
            </main>
        </div>
    );
}
