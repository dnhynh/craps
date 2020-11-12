import React, {useEffect} from "react"
import styled from "styled-components"
import Interface from "./Interface"
import BetType from "./BetType"
import NumBets from "./NumBets"
import useCrapsLogic from "../game/useCrapsLogic"

const Table = styled.div`
    width: 700px;
    border: 2px solid black;
    margin: 0 auto;
    background-color: #477148;
    font-size: 1.5rem;
    color: #fff;
    line-height: 1.5;
`

const Craps = () => {
    const {
        dice, 
        resolveRoll,
        handleBet,
        adjustBet,
        rollDice,
        bets,
        net,
        point,
        bank
    } = useCrapsLogic()

    useEffect(() => {
        resolveRoll()
    }, // eslint-disable-next-line
    [dice])

    return (
        <>
            <div className="game-container">
                <Table>
                    <NumBets nums={bets.nums} handleBet={handleBet} point={point.value} bets={bets.nums}/>
                    <BetType type="field" bet={bets.field} handleBet={handleBet}>
                        The Field
                        <p style={{fontSize: "1rem"}}>2 3 4 9 10 11 12</p>
                    </BetType>
                    <BetType type="dont" bet={bets.dont} handleBet={handleBet}>Do not Pass</BetType>
                    <BetType type="pass" bet={bets.pass} handleBet={handleBet}>Pass Line</BetType>
                    <BetType type="odds" bet={bets.odds} handleBet={handleBet}>Odds</BetType>
                </Table>
            </div>
            <Interface 
                net={net} 
                point={point} 
                roll={rollDice} 
                changeWager={adjustBet} 
                dice={dice} 
                bank={bank}
            />
        </>
    )
}

export default Craps