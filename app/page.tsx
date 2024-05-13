'use client';
import { saveAs } from 'file-saver';

import {ChangeEvent, Component, useState} from "react";
import MPS from "@/components/MPS";
import Plan from "@/models/plan";
import MPSPeriod from "@/models/MPSPeriod";
import MRPComponent from "@/models/MRPComponent";
import MRPPeriod from "@/models/MRPPeriod";

export default function Home() {
    const handleExport = () => {
        const json = JSON.stringify(mrp);
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
            setMrp(plan);
          };
          reader.readAsText(file);
        }
      };
    
    const [componentIndex, setComponentIndex] = useState(null);

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
            ),new MRPComponent(
                "Obudowa",
                5,
                3,
                5,
                0,
                DEFAULT_NUMBER_OF_PERIODS,
                Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
                [])]
        ),new MRPComponent(
            "Kabel Audio",
            1,
            2,30,20,DEFAULT_NUMBER_OF_PERIODS,
            Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),
            [new MRPComponent(
                "Przewód",
                1,1,50,10,DEFAULT_NUMBER_OF_PERIODS,Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),[]),
                new MRPComponent(
                    "Wtyczka",
                    2,1,50,10,DEFAULT_NUMBER_OF_PERIODS,Array.from({length: DEFAULT_NUMBER_OF_PERIODS}, () => new MRPPeriod()),[]
                )]
            )];


    const [mrp, setMrp] = useState(
        new Plan(
          DEFAULT_NUMBER_OF_PERIODS,
          0,
          Array(DEFAULT_NUMBER_OF_PERIODS).fill(new MPSPeriod()),
          components
        )
      );
     

    return (
        <div>
            <div className="pt-10 mx-20 ">
                <h1 className="text-3xl font-bold ">NanoMRP</h1>
                <button onClick={handleExport}>Export Plan</button>
                <input type="file" accept=".json" onChange={handleImport} />
            </div>
            <main className="p-10">
                <section className="flex flex-col gap-5">
                    <div className="overflow-x-auto">
                        <MPS plan={mrp} setPlan={setMrp} componentIndex={componentIndex} setComponentIndex={setComponentIndex}/>
                    </div>
                </section>
            </main>
        </div>
    );
}
