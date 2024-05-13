'use client';

import {ChangeEvent, Component, useState} from "react";
import MasterProductionSchedule from "@/components/MasterProductionSchedule";
import Plan from "@/models/plan";
import recalculate, { recalculateComponent } from "@/lib/recalculate";
import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";
import MRPStuff from "@/components/mrp";
import MRPPeriod from "@/models/MRPPeriod";

export default function Home() {

    // Default number of periods in the Master Production Schedule and all the components
    const DEFAULT_NUMBER_OF_PERIODS = 7;
    const components: MRPComponent[] = [
        new MRPComponent(
            "Pałąk",
            40,
            3,
            40,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            []
        ),
        new MRPComponent(
            "Nausznik",
            40,
            2,
            120,
            0,
            DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            [new MRPComponent(
                "Głośnik",
                5,
                3,
                5,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            ),new MRPComponent(
                "Gąbka",
                5,
                3,
                5,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                []
            )]
        )
    ];
    
    const [mrp, setMrp] = useState(
        new Plan(
          DEFAULT_NUMBER_OF_PERIODS,
          0,
          Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MPSPeriod()),
          components
         
            
        
        )
      );
    const handleNumberOfPeriodsChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Get the new number of periods
        const numberOfPeriods = parseInt(e.target.value) || 0;

        // Update the number of periods
        const newMrp = {...mrp, numberOfPeriods: numberOfPeriods};
        const newTestComponent = {...mrp.mrpComponents[0],numberOfPeriods:numberOfPeriods}
        newMrp.mpsPeriods = newMrp.mpsPeriods.slice(0, numberOfPeriods);
        while (newMrp.mpsPeriods.length < numberOfPeriods) {
            newMrp.mpsPeriods.push(new MPSPeriod());
        }
    
        // Recalculate the plan
        setMrp(recalculate(newMrp));

       // const newcomponent = {... component,numberOfPeriods: numberOfPeriods};
                
    }
    const handleComponentChange = (newComponent, index) => {
        setMrp((currentMrp) => {
            console.log("index is "+index)
            // Create a new copy of the mrp state
            const newMrp = JSON.parse(JSON.stringify(currentMrp));
    
            // Replace the component at the given index with the new component
            newMrp.mrpComponents[index] = newComponent;
    
            // Recalculate the MRP values for the new component
            newMrp.mrpComponents[index] = recalculateComponent(newMrp.mrpComponents[index]);
    
            // Return the new MRP state
            return newMrp;
        });
    };
    function setComponent(component: MRPComponent,index): void {
     
        handleComponentChange(component,index)
    }

    return (
        <div>
            <div className="pt-10 mx-20 ">
                <h1 className="text-3xl font-bold text-white">NanoMRP</h1>
            </div>
            <main className="p-10 mx-auto mx-20">
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
                    </div>
                    <div className="flex gap-5 pt-5">
                        <label>
                            <a className="text-xl pr-5">Automatic MSP production calculation</a>
                            <input 
                                type="checkbox" 
                                onChange={(e) => {
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
                <section>
                    {mrp.mrpComponents.map((component, index) => (
                        <div key={index}>
                            <h2 className="pt-5 pb-10 text-2xl font-bold text-white">{component.name}</h2>
                            <div className="flex gap-5">
                                <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                                    On hand
                                    <input
                                        type="number"
                                        className="grow min-w-10"
                                        value={component.onHand.toString() || 0}
                                        onChange={(e) => {
                                            const newComponent = { ...component, onHand: parseInt(e.target.value) || 0 };
                                            handleComponentChange(newComponent, index);
                                        }}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                                    Lot size
                                    <input
                                        type="number"
                                        className="grow min-w-10"
                                        value={component.lotSize.toString() || 0}
                                        onChange={(e) => {
                                            const newComponent = { ...component, lotSize: parseInt(e.target.value) || 0 };
                                            handleComponentChange(newComponent, index);
                                        }}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                                    Realization time
                                    <input
                                        type="number"
                                        className="grow min-w-10"
                                        value={component.leadTime.toString() || 0}
                                        onChange={(e) => {
                                            const newComponent = { ...component, leadTime: parseInt(e.target.value) || 0 };
                                            handleComponentChange(newComponent, index);
                                        }}
                                    />
                                </label>
                            
                            </div>
                            <MRPStuff component={component} setComponent={(component, index) => setComponent(component, index)} />
                          
                            </div>
                            ))}      
                </section>
            </main>
        </div>
    );
}
