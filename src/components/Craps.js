import React, {useState, useEffect, useLayoutEffect} from "react"
import Interface from "./Interface"
import rollSound from "../static/roll-sound.mp3"
import styled from "styled-components"
import BetType from "./BetType"
import NumBets from "./NumBets"

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

    const [point, setPoint] = useState(null)
    const [dice, setDice] = useState({
        first: null,
        second: null,
        total: null,
        turn: 0
    })

    const placeBet = (value) => {
        console.log(value)
    }

    const adjustBet = (value) => {
        console.log(`Chips: ${bank.chips} Wager: ${bank.wager} Value: ${value}`)
        setBank((prevBank) => {
            if(prevBank.wager + value <= prevBank.chips && prevBank.wager + value > 0) {
                const newBank = {
                    ...prevBank, 
                    wager: prevBank.wager + value
                }
                return newBank
            }
            else {
                return prevBank
            }
        })
    }

    const [bank, setBank] = useState({
        chips: 30,
        wager: 10,
        changeWager: adjustBet
    })

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

    useEffect(() => {
        console.log(bank)
    }, [bank])

    return (
        <>
            <div className="game-container">
                <div className="table">
                    <NumsRow>
                        <NumBets placeBet={placeBet}/>
                    </NumsRow>
                    <BetType type="field">
                        The Field
                        <p className="field-nums">2 3 4 9 10 11 12</p>
                    </BetType>
                    <BetType type="dontPass">Do not Pass</BetType>
                    <BetType type="pass" placeBet={placeBet} value="pass">Pass Line</BetType>
                    <BetType type="odds">Odds</BetType>
                </div>
            </div>
            <Interface point={point} roll={rollDice} dice={dice} bank={bank}/>
        </>
    )
}

export default Craps