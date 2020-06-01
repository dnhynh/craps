import React from "react"
import BetType from "./BetType"

const nums = [10, "NINE", 8, "SIX", 5, 4]

const NumBets = (props) => {
    const bets = nums.map((num) => (
    <BetType key={num} type="num" value={num}>{num}</BetType>
    ))
    return (
        <>
            {bets}
        </>
    )
}

export default NumBets