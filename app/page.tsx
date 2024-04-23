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
    
    const [mrp, setMrp] = useState(
        new Plan(
          DEFAULT_NUMBER_OF_PERIODS,
          0,
          Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MPSPeriod()),
          Array(DEFAULT_NUMBER_OF_PERIODS).fill(
            new MRPComponent(
              "pałąk",
              10,
              3,
              5,
              2,
              DEFAULT_NUMBER_OF_PERIODS,
              Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MRPPeriod()),
              []
            )
          )
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
    const handleComponentChange = (newComponent: MRPComponent, index: number) => {
        console.log("?")
        setMrp((prevMrp) => {
          const updatedComponents = [...prevMrp.mrpComponents];
          updatedComponents[index] = newComponent;
          console.log("handle component change " ,newComponent)
          return { ...prevMrp, mrpComponents: updatedComponents };
        });
      };

    function setComponent(component: MRPComponent): void {
     
        handleComponentChange(component,0)
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
            <section>
            
            <div className="flex gap-5">
                    
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        On hand
                        <input type="number" className="grow min-w-10"
                            value={mrp.mrpComponents[0].onHand.toString() || 0}
                            
                            onChange={(e) => {
                               // console.log("value is",mrp.mrpComponents[0])
                               const newComponent = { ...mrp.mrpComponents[0], onHand: parseInt(e.target.value) || 0 };

                               setComponent(newComponent)

                            }}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-2 max-w-sm min-w-24 transition whitespace-nowrap">
                        Lot size
                        <input type="number" className="grow min-w-10"
                            value={mrp.mrpComponents[0].lotSize.toString() || 0}
                            onChange={(e) => {
                                const newComponent = { ...mrp.mrpComponents[0], lotSize: parseInt(e.target.value) || 0 };

                                handleComponentChange(newComponent, 0);

                            }}
                        />
                    </label>
                
                </div>
                <div>
                <MRPStuff
  component={mrp.mrpComponents[0]}
  setComponent={setComponent}
/>
                </div>
                
            </section>
        </main>
    );
}
