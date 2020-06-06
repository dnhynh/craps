import React from "react"
import BetType from "./BetType"
import styled from "styled-components"

const nums = [10, "NINE", 8, "SIX", 5, 4]

const NumsRow = styled.div`
    display: flex;
    width: 100%;
    & > div {
        flex: 1 0 auto;
    }
`

const NumBets = (props) => {
    const bets = nums.map((num) => (
    <BetType key={num} handleBet={props.handleBet} handleRemove={props.handleRemove} bet={props.bets[num]} type="nums" value={num}>{num}</BetType>
    ))
    return (
        <NumsRow>
            {bets}
        </NumsRow>
    )
}

export default NumBets