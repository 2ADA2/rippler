"use client"

import Image, {StaticImageData} from "next/image";

export interface FPEInterface{
    imgUrl: StaticImageData;
    short:string;
    name:string;
    price:string;
    activity:string;
}

export const FPElement = ({...props}:FPEInterface) => {
    const isGrow:boolean = props.activity.split("")[0]!="-"
    return (
        <div className={"fpe flex justify-between items-center"}>
            <div className={"flex gap-2 items-center"}>
                <Image src={props.imgUrl} alt={"logo"} width={"100"} height={"100"} />
                <h5>{props.short}</h5>
                <span>{props.name}</span>
            </div>
            <div className={"flex gap-2"}>
                <span>{props.price}</span>
                <span className={isGrow ? "upper" : "lower"}>{props.activity}</span>
            </div>
        </div>
    );
};
