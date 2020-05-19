import React, {useState} from "react"
import Interface from "./Interface";
import BetType from "./BetType"


const Table = () => {
    return (
        <div className="game-container">
            <div className="table">
                <div className="nums">
                    <BetType type="ten">
                        10
                    </BetType>
                    <BetType type="nine">NINE</BetType>
                    <BetType type="eight">8</BetType>
                    <BetType type="six">SIX</BetType>
                    <BetType type="five">5</BetType>
                    <BetType type="four">4</BetType>
                </div>
                <BetType type="field">
                    The Field
                    <p className="field-nums">2 3 4 9 10 11 12</p>
                </BetType>
                <BetType type="dontPass">Do not Pass</BetType>
                <BetType type="pass">Pass Line</BetType>
                <BetType type="odds">Odds</BetType>
            </div>
            <Interface />
        </div>
    )
}

export default Table