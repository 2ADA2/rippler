"use client"
import {useState} from "react";

export default function Page() {
    const [counter, setCounter] = useState(1);
    console.log(123)

    return (
        <div className="flex flex-col gap-1 justify-center items-center">
            <h1 className="text-3xl">Counter</h1>
            <div className="text-2xl p-2">{counter}</div>
            <div className="flex gap-1">
                <button onClick={() => setCounter(counter+1)}>+</button>
                <button onClick={() => setCounter((counter-1) || 1)}>-</button>
            </div>
        </div>
    )
}
