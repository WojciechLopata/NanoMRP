'use client';

import {useState} from "react";
import MPS from "@/components/MPS";
import Plan from "@/models/plan";
import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";
import recalculate, {recalculateComponent} from "@/lib/recalculate";
import Hero from "@/components/Hero";

export default function Home() {
    const [componentIndex, setComponentIndex] = useState(null);

    // Default number of periods in the Master Production Schedule and all the components
    const DEFAULT_NUMBER_OF_PERIODS = 7;
    const components: MRPComponent[] = [
        new MRPComponent(
            "Headband",
            40,
            3,
            40,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            []
        ),
        new MRPComponent(
            "Earcup",
            40,
            2,
            120,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            [new MRPComponent(
                "Speaker",
                5,
                3,
                5,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            ), new MRPComponent(
                "Foam",
                5,
                3,
                5,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            ), new MRPComponent(
                "Enclosure",
                5,
                3,
                5,
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
                <MPS plan={plan} recalculatePlan={recalculatePlan}
                     recalculatePlanByComponent={recalculatePlanByComponent} componentIndex={componentIndex}
                     setComponentIndex={setComponentIndex}/>
            </main>
        </div>
    );
}
