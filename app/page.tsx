'use client';

import {useState} from "react";
import MasterProductionSchedule from "@/components/MasterProductionSchedule";

export default function Home() {

    const [numberOfWeeks, setNumberOfWeeks] = useState(7);
    const [inStock, setInStock] = useState(0);

    const [demand, setDemand] = useState(Array(numberOfWeeks).fill(0));
    const [production, setProduction] = useState(Array(numberOfWeeks).fill(0));
    const [available, setAvailable] = useState(Array(numberOfWeeks).fill(0));

    return (
        <main className="p-10 container mx-auto">
            <section className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Number of weeks
                        <input type="number" className="grow"
                               value={numberOfWeeks}
                               onChange={(e) => {
                                   const newNumberOfWeeks = parseInt(e.target.value);
                                   if (isNaN(newNumberOfWeeks) || newNumberOfWeeks < 1) return;
                                   setNumberOfWeeks(newNumberOfWeeks);
                               }}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        In stock
                        <input type="number" className="grow"
                               value={inStock.toString() || 0}
                               onChange={(e) => {
                                   setInStock(parseInt(e.target.value) || 0);
                               }}
                        />
                    </label>
                </div>
                <div className="overflow-x-auto">
                    <MasterProductionSchedule
                        numberOfWeeks={numberOfWeeks}
                        inStock={inStock}
                        demand={demand}
                        setDemand={setDemand}
                        production={production}
                        setProduction={setProduction}
                        available={available}
                        setAvailable={setAvailable}
                    />
                </div>
            </section>
        </main>
    );
}
