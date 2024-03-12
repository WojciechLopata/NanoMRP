'use client';

import MasterProductionSchedule from "@/lib/master-production-schedule";
import {useState} from "react";

export default function Home() {

    const [numberOfWeeks, setNumberOfWeeks] = useState(7);
    const [inStock, setInStock] = useState(0);

    // Make editable masterProductionSchedule object
    const [masterProductionSchedule, setMasterProductionSchedule] = useState(new MasterProductionSchedule(
        Array(numberOfWeeks).fill(0),
        Array(numberOfWeeks).fill(0),
        Array(numberOfWeeks).fill(0)
    ))

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
                                   const fillArrayLength = newNumberOfWeeks - numberOfWeeks > 0 ? newNumberOfWeeks - numberOfWeeks : 0;
                                   setMasterProductionSchedule(new MasterProductionSchedule(
                                       [...masterProductionSchedule.projectedDemand.slice(0, newNumberOfWeeks), ...Array(fillArrayLength).fill(0)],
                                       [...masterProductionSchedule.production.slice(0, newNumberOfWeeks), ...Array(fillArrayLength).fill(0)],
                                       [...masterProductionSchedule.available.slice(0, newNumberOfWeeks), ...Array(fillArrayLength).fill(0)],
                                   ));
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
                    <table className="table table-pin-cols">
                        <tbody>
                        <tr>
                            <th>Week</th>
                            {masterProductionSchedule.projectedDemand.map((demand, index) => (
                                <td className="text-center" key={index}>{index + 1}</td>
                            ))}
                        </tr>
                        <tr>
                            <th>Projected demand</th>
                            {masterProductionSchedule.projectedDemand.map((demand, index) => (
                                <td key={index}>
                                    <input type="number"
                                           className={`input input-bordered w-full min-w-24 transition ${!demand ? "opacity-50" : ""} focus:opacity-100`}
                                           value={demand.toString() || 0}
                                           onChange={(e) => {
                                               const newProjectedDemand = [...masterProductionSchedule.projectedDemand];
                                               newProjectedDemand[index] = parseInt(e.target.value);
                                               setMasterProductionSchedule(new MasterProductionSchedule(
                                                   newProjectedDemand,
                                                   masterProductionSchedule.production,
                                                   masterProductionSchedule.available
                                               ));
                                           }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>Production</th>
                            {masterProductionSchedule.production.map((production, index) => (
                                <td key={index}>
                                    <input type="number"
                                           className={`input input-bordered w-full min-w-24 transition ${!production ? "opacity-50" : ""} focus:opacity-100`}
                                           value={production.toString() || 0}
                                           onChange={(e) => {
                                               const newProduction = [...masterProductionSchedule.production];
                                               newProduction[index] = parseInt(e.target.value);
                                               setMasterProductionSchedule(new MasterProductionSchedule(
                                                   masterProductionSchedule.projectedDemand,
                                                   newProduction,
                                                   masterProductionSchedule.available
                                               ));
                                           }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th>Available</th>
                            {masterProductionSchedule.available.map((available, index) => (
                                <td key={index}>
                                    <input type="number"
                                           className={`input input-bordered w-full min-w-24 transition ${!available ? "opacity-50" : ""} focus:opacity-100`}
                                           value={available.toString() || 0}
                                           onChange={(e) => {
                                               const newAvailable = [...masterProductionSchedule.available];
                                               newAvailable[index] = parseInt(e.target.value);
                                               setMasterProductionSchedule(new MasterProductionSchedule(
                                                   masterProductionSchedule.projectedDemand,
                                                   masterProductionSchedule.production,
                                                   newAvailable
                                               ));
                                           }}
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
