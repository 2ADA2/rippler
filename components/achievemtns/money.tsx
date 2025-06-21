import {Level} from "@/components/achievemtns/achievements";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDollarSign} from "@fortawesome/free-solid-svg-icons";

const achievements = [
    {
        "title": "Novice Earner",
        "description": "The first coins earned on your journey.",
        "condition": "Earnings: 10€"
    },
    {
        "title": "Skilled Trader",
        "description": "Growing your wealth steadily.",
        "condition": "Earnings: 100€"
    },
    {
        "title": "Seasoned Investor",
        "description": "You know how to make your money work.",
        "condition": "Earnings: 1,000€"
    },
    {
        "title": "Profit Hunter",
        "description": "Hunting profits like a true pro.",
        "condition": "Earnings: 10,000€"
    },
    {
        "title": "Market Master",
        "description": "Mastering the art of earning big.",
        "condition": "Earnings: 100,000€"
    },
    {
        "title": "Wealth Architect",
        "description": "Building an empire with every trade.",
        "condition": "Earnings: 1,000,000€"
    },
    {
        "title": "Financial Legend",
        "description": "A true legend of the market, unmatched in earnings.",
        "condition": "Earnings: 10,000,000€"
    }
]

export const MoneyAch:React.FC<Level> = ({lvl}) => {
    return <div className={"achieve money " + "money" + lvl}>
        <span><FontAwesomeIcon icon={faDollarSign}/></span>
        <div>
            <h5>{achievements[lvl].title}</h5>
            <p>{achievements[lvl].description}</p>
            <span>{achievements[lvl].condition}</span>
        </div>
    </div>
}