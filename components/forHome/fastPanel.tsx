"use client"

import {useState} from "react";
import {popularPositions} from "@/utils/testData";
import {FPEInterface, FPElement} from "@/components/forHome/fpElement";
import {useAppSelector} from "@/lib/hooks";

export const FastPanel = () => {
    const [active, setActive] = useState<string>("popular");
    return (
        <div className={"fp-container"}>
            <div className={"fast-panel grid grid-rows-2"}>
                <div className={"flex gap-5"}>
                    <button
                        className={active == "popular" ? "light-button-active light-button" : "light-button"}
                        onClick={() => setActive("popular")}
                    >Popular
                    </button>
                    <button
                        className={active == "rec" ? "light-button-active light-button" : "light-button"}
                        onClick={() => setActive("rec")}
                    >Recommended
                    </button>
                </div>
                <div className={"flex flex-col gap-2"} style={{marginTop:10}}>
                    {popularPositions.map(
                        (position:FPEInterface) => {
                        return (<FPElement {...position} key={position.name}/>)
                    })}
                </div>
            </div>
        </div>
    );
};
