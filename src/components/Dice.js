import React, {useState} from "react";

const Dice = (props) => {
    // Dice state
    const [diceValues, setDice] = useState([Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)])
    const rollDice = () => {
        setDice([Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)])
        setPoint(diceValues[0] + diceValues[1])    
    }
    // The Point
    const [point, setPoint] = useState(diceValues[0] + diceValues[1])
    // Roll Resolution

    return (
        <div className="diceContainer">
            <div>{point}</div>
            <div className="dice">
                <div className="die">{diceValues[0]}</div>
                <div className="die">{diceValues[1]}</div>
            </div>
            <button onClick={rollDice}>Roll Dice</button>

        </div>
    )
}

export default Dice