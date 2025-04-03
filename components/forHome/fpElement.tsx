"use client"

import Image from "next/image";

export interface FPEInterface{
    imgUrl: string;
    short:string;
    name:string;
    price:string;
    activity:string;
}

export const FPElement = ({...props}:FPEInterface) => {
    return (
        <div className={"fpe flex justify-between items-center"}>
            <div className={"flex gap-1 items-center"}>
                <Image src={props.imgUrl} alt={"logo"} width={"50"} height={"50"} />
                <h5>{props.short}</h5>
                <span>{props.name}</span>
            </div>
            <span>{props.price}</span>
            <span>{props.activity}</span>
        </div>
    );
};
