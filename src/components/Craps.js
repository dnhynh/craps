import React, {useState, useLayoutEffect} from "react"
import Interface from "./Interface"
import rollSound from "../static/roll-sound.mp3"
import styled from "styled-components"
import BetType from "./BetType"

const NumsRow = styled.div`
    display: flex;
    width: 100%;
    & > div {
        flex: 1 0 auto;
    }
`

const Craps = () => {
    const rs = new Audio(rollSound)
    // const [bets, setBets] = useState({
    //     pass: null, 
    //     dont: null, 
    //     field: null,
    //     nums: {
    //         10: null,
    //         8: null,
    //         6: null,
    //         5: null,
    //         4: null
    //     },
    //     odds: null
    // })
    // const [chipStack, setChipStack] = useState(1000)
    // const [wager, setWager] = useState(5)
    const [point, setPoint] = useState(null)
    const [dice, setDice] = useState({
        first: null,
        second: null,
        total: null,
        turn: 0
    })
    const rollDice = () => {
        rs.play()
        const firstDie = Math.ceil(Math.random() * 6)
        const secondDie = Math.ceil(Math.random() * 6)
        const total = firstDie + secondDie
        setDice((prev) => {
            return {
                first: firstDie,
                second: secondDie,
                total: total,
                turn: prev.turn + 1
            }
        })
    }

    useLayoutEffect(() => {
        // Initial Roll
        if(!point) {
            if(dice.total === 7 || dice.total === 11) {
                setPoint(null)
                window.alert('winner')
            }
            else if(dice.total === 2 || dice.total === 3 || dice.total === 12) {
                window.alert('loser')
                setPoint(null)
            }
            else {
                window.alert('else')
                setPoint(dice.total)
            }
        }
        // Point is Set
        else if(point) {
            if(dice.total === point) {
                setPoint(null)
                window.alert('winner')
            }
            if(dice.total === 7) {
                setPoint(null)
                window.alert('loser')
            }
        }
    }, [dice])

    return (
        <>
            <div className="game-container">
                <div className="table">
                    <NumsRow>
                        <BetType>10</BetType>
                        <BetType>NINE</BetType>
                        <BetType>8</BetType>
                        <BetType>SIX</BetType>
                        <BetType>5</BetType>
                        <BetType>4</BetType>
                    </NumsRow>
                    <BetType type="field">
                        The Field
                        <p className="field-nums">2 3 4 9 10 11 12</p>
                    </BetType>
                    <BetType type="dontPass">Do not Pass</BetType>
                    <BetType type="pass">Pass Line</BetType>
                    <BetType type="odds">Odds</BetType>
                </div>
            </div>
            <Interface dieOne={dice.first} dieTwo={dice.second} currentRoll={dice.total} rollDice={rollDice}/>
        </>
    )
}

export default Craps