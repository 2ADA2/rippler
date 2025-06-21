"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowTrendUp, faIndustry} from "@fortawesome/free-solid-svg-icons";

export interface Level {
    lvl:number;
}
const achievements = {
    Shadow:{
        "title": "I Am the Shadow",
        "description": "You move in the shadows of giants — unseen, but always profitable.",
        "condition": "Make 20 profitable trades with major company stocks, each ending in profit"
    }
}

export const Stock = () => {
    return <div className={"achieve stock"}>
        <FontAwesomeIcon icon={faArrowTrendUp}/>
        <div>
            <h5>{achievements.Shadow.title}</h5>
            <p>{achievements.Shadow.description}</p>
            <span>{achievements.Shadow.condition}</span>
        </div>
    </div>
}