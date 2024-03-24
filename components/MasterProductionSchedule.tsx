import {useState} from "react";

export default function MasterProductionSchedule(props: {
    numberOfWeeks: number,
    inStock: number,
    demand: number[],
    setDemand: Function,
    production: number[],
    setProduction: Function,
    available: number[],
    setAvailable: Function
}) {
    const {
        numberOfWeeks,
        inStock,
        demand,
        setDemand,
        production,
        setProduction,
        available,
        setAvailable
    } = props;

    if (demand.length !== numberOfWeeks) {
        const fillArrayLength = numberOfWeeks - demand.length > 0 ? numberOfWeeks - demand.length : 0;
        setDemand([...demand.slice(0, numberOfWeeks), ...Array(fillArrayLength).fill(0)])
        setProduction([...production.slice(0, numberOfWeeks), ...Array(fillArrayLength).fill(0)])
        setAvailable([...available.slice(0, numberOfWeeks), ...Array(fillArrayLength).fill(0)])
    }

    return (
        <table className="table table-pin-cols">
            <tbody>
            <tr>
                <th>Week</th>
                {demand.map((demand, index) => (
                    <td className="text-center" key={index}>{index + 1}</td>
                ))}
            </tr>
            <tr>
                <th>Demand</th>
                {demand.map((value, index) => (
                    <td key={index}>
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!value ? "opacity-50" : ""} focus:opacity-100`}
                               value={value.toString() || 0}
                               onChange={(e) => {
                                   setDemand(demand.map((item: number, i: number) => {
                                           return index === i ? parseInt(e.target.value) : item;
                                       }
                                   ));
                               }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Production</th>
                {production.map((value, index) => (
                    <td key={index}>
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!value ? "opacity-50" : ""} focus:opacity-100`}
                               value={value.toString() || 0}
                               onChange={(e) => {
                                   setProduction(production.map((item: number, i: number) => {
                                           return index === i ? parseInt(e.target.value) : item;
                                       }
                                   ));
                               }}
                        />
                    </td>
                ))}
            </tr>
            <tr>
                <th>Available</th>
                {available.map((value, index) => (
                    <td key={index}>
                        <input type="number"
                               className={`input input-bordered w-full min-w-24 transition ${!value ? "opacity-50" : ""} focus:opacity-100`}
                               value={value.toString() || 0}
                               onChange={(e) => {
                                   setAvailable(available.map((item: number, i: number) => {
                                           return index === i ? parseInt(e.target.value) : item;
                                       }
                                   ));
                               }}
                        />
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    );
}
