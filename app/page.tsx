'use client';

import {ChangeEvent, useState} from "react";
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

    const handleNumberOfPeriodsChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get the new number of periods
        const numberOfPeriods = parseInt(e.target.value) || 0;

        // Update the number of periods
        const newMrp = {...mrp, numberOfPeriods: numberOfPeriods};
        newMrp.mpsPeriods = newMrp.mpsPeriods.slice(0, numberOfPeriods);
        while (newMrp.mpsPeriods.length < numberOfPeriods) {
            newMrp.mpsPeriods.push(new MPSPeriod());
        }

        // Recalculate the plan
        setMrp(recalculate(newMrp));
    }

    return (
        <main className="p-10 mx-auto">
            <section className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Number of periods
                        <input type="number" className="grow min-w-10"
                            value={mrp.numberOfPeriods.toString() || 0}
                            onChange={handleNumberOfPeriodsChange}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        On hand
                        <input type="number" className="grow min-w-10"
                            value={mrp.onHand.toString() || 0}
                            onChange={(e) => {
                                const newMrp = JSON.parse(JSON.stringify(mrp));
                                newMrp.onHand = parseInt(e.target.value) || 0;
                                setMrp(recalculate(newMrp));
                            }}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Lot size
                        <input type="number" className="grow min-w-10"
                            value={mrp.lotSize.toString() || 0}
                            onChange={(e) => {
                                const newMrp = JSON.parse(JSON.stringify(mrp));
                                newMrp.lotSize = parseInt(e.target.value) || 0;
                                setMrp(recalculate(newMrp));
                            }}
                        />
                    </label>
                    <label>
                        Automatic MSP production calculation 
                        <input type="checkbox" onChange={(e) => {
                            const newMrp = JSON.parse(JSON.stringify(mrp));
                            newMrp.automaticMSPCalculations =  !newMrp.automaticMSPCalculations 
                                
                                   setMrp(recalculate(newMrp));
                               }}/>

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
