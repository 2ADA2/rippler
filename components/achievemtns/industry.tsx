import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faIndustry} from "@fortawesome/free-solid-svg-icons";
import {Level} from "@/components/achievemtns/achievements";

const achievements = [
    {
        "title": "Factory Apprentice",
        "description": "First steps on the path of production.",
        "condition": "Turnover of goods: 1,000"
    },
    {
        "title": "Line Master",
        "description": "You control the process with confidence.",
        "condition": "Turnover of goods: 5,000"
    },
    {
        "title": "Factory Warrior",
        "description": "Every order is a challenge, and you accept it.",
        "condition": "Turnover of goods: 20,000"
    },
    {
        "title": "Lord of Production",
        "description": "King of the factory, mastering every process.",
        "condition": "Turnover of goods: 100,000"
    }
]

export const Industry:React.FC<Level> = ({lvl}) => {
    return <div className={"achieve industry " + "ind" + lvl}>
        <FontAwesomeIcon icon={faIndustry}/>
        <div>
            <h5>{achievements[lvl].title}</h5>
            <p>{achievements[lvl].description}</p>
            <span>{achievements[lvl].condition}</span>
        </div>
    </div>
}