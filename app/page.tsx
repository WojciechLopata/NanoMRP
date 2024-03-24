'use client';

import {useState} from "react";
import MasterProductionSchedule from "@/components/MasterProductionSchedule";
import Mrp from "@/models/mrp";
import MpsPeriod from "@/models/mpsPeriod";
import recalculate from "@/lib/recalculate";

export default function Home() {

    const [mrp, setMrp] = useState(new Mrp(7));

    return (
        <main className="p-10 mx-auto">
            <section className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Number of weeks
                        <input type="number" className="grow"
                               value={mrp.numberOfPeriods}
                               onChange={(e) => {
                                   const numberOfPeriods = parseInt(e.target.value);
                                   if (isNaN(numberOfPeriods) || numberOfPeriods < 1) return;
                                   const fillArrayLength = numberOfPeriods - mrp.mpsPeriods.length > 0 ? numberOfPeriods - mrp.mpsPeriods.length : 0;
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.numberOfPeriods = numberOfPeriods;
                                   newMrp.mpsPeriods = [...mrp.mpsPeriods.slice(0, numberOfPeriods), ...Array(fillArrayLength).fill(new MpsPeriod())];
                                   setMrp(recalculate(newMrp));
                               }}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        In stock
                        <input type="number" className="grow"
                               value={mrp.inventory.toString() || 0}
                               onChange={(e) => {
                                   const newMrp = JSON.parse(JSON.stringify(mrp));
                                   newMrp.inventory = parseInt(e.target.value) || 0;
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
