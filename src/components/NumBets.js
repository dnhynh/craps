import React from "react"
import BetType from "./BetType"
import styled from "styled-components"

const NumsRow = styled.div`
    display: flex;
    width: 100%;
    & > div {
        flex: 1 0 auto;
    }
`

const labels = {
    4: 4,
    5: 5,
    6: "SIX",
    8: 8,
    9: "NINE",
    10: 10
}

const NumBets = (props) => {
    const bets = []
    for(let num in props.bets) {
        bets.push(<BetType key={num} handleBet={props.handleBet} bet={props.bets[num]} type="nums" value={num}>
            {labels[num]}</BetType>)
    }
    return (
        <NumsRow>
            {bets}
        </NumsRow>
    )
}

export default NumBets