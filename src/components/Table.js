import React from "react"
import Dice from "./Dice"

const Table = () => {
    return (
        <div className="table">
            <div className="nums">
                <div betType="10">10</div>
                <div betType="9">NINE</div>
                <div betType="8">8</div>
                <div betType="6">SIX</div>
                <div betType="5">5</div>
                <div betType="4">4</div>
            </div>
            <div betType="field">2 3 4 9 10 11 12</div>
            <div betType="doNotPass">Do not Pass</div>
            <div betType="passline">Pass Line</div>
        </div>
    )
}

export default Table