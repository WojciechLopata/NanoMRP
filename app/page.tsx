'use client';

import {useState} from "react";
import MasterProductionSchedule from "@/components/MasterProductionSchedule";
import Plan from "@/models/plan";
import recalculate from "@/lib/recalculate";
import MPSPeriod from "@/models/MPSPeriod";

export default function Home() {

    // Default number of periods in the Master Production Schedule and all the components
    const DEFAULT_NUMBER_OF_PERIODS = 7;

    const [mrp, setMrp] = useState(new Plan(
        DEFAULT_NUMBER_OF_PERIODS,
        0,
        Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MPSPeriod()),
        []
    ));

    return (
        <main className="p-10 mx-auto">
            <section className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Number of periods
                        <input type="number" className="grow"
                               value={mrp.numberOfPeriods}
                               onChange={(e) => {
                                   const numberOfPeriods = parseInt(e.target.value);
                                   if (isNaN(numberOfPeriods) || numberOfPeriods < 1) return;
                                   const fillArrayLength = numberOfPeriods - mrp.mpsPeriods.length > 0 ? numberOfPeriods - mrp.mpsPeriods.length : 0;
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.numberOfPeriods = numberOfPeriods;
                                   newMrp.mpsPeriods = [...mrp.mpsPeriods.slice(0, numberOfPeriods), ...Array(fillArrayLength).fill(new MPSPeriod())];
                                   setMrp(recalculate(newMrp));
                               }}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        On hand
                        <input type="number" className="grow"
                               value={mrp.onHand.toString() || 0}
                               onChange={(e) => {
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.onHand = parseInt(e.target.value) || 0;
                                   setMrp(recalculate(newMrp));
                               }}
                        />
                    </label>
                </div>
                <div className="overflow-x-auto">
                    <MasterProductionSchedule
                        mrp={mrp}
                        setMrp={setMrp}
                    />
                </div>
            </section>
        </main>
    );
}
