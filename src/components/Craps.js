import React, {useState, useEffect, useLayoutEffect} from "react"
import Interface from "./Interface"
import BetType from "./BetType"
import NumBets from "./NumBets"

const Craps = () => {
    const [bets, setBets] = useState({
        pass: null, 
        dont: null, 
        field: null,
        nums: {
            10: null,
            "NINE": null,
            8: null,
            "SIX": null,
            5: null,
            4: null
        },
        odds: null
    })

    const placeBet = (bet) => {
        const {type, value} = bet
        console.log(bet)
        if(bank.wager<= bank.chips) {
            console.log(type)
            setBets((prevBets) => {
                const newBets = {...prevBets}
                newBets[type] += bank.wager
                console.log(newBets[type])
                return newBets
            })
            setBank({
                chips: bank.chips - bank.wager,
                wager: bank.wager
            })
        }
    }

    const rollDice = () => {
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

    const adjustBet = (value) => {
        if(bank.wager + value <= bank.chips && bank.wager + value > 0) {
            setBank((prevBank) => {
                    const newBank = {
                        ...prevBank, 
                        wager: prevBank.wager + value
                    }
                    return newBank
            })
        }
    }

    const resolveBets = (result, roll) => {
        // Winning Roll 
        if(result === "win") {
            
        }
        // Losing Bets
        else {

        }
    }

    const [bank, setBank] = useState({
        chips: 100,
        wager: 10,
    })

    useLayoutEffect(() => {
        // Initial Roll
        if(!point) {
            if(dice.total === 7 || dice.total === 11) {
                setPoint(null)
                resolveBets(true, dice.total)
            }
            else if(dice.total === 2 || dice.total === 3 || dice.total === 12) {
                window.alert('loser')
                setPoint(null)
                resolveBets(false, dice.total)
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
    }, // eslint-disable-next-line
    [dice])

    useEffect(() => {
        console.log(bank)
    }, [bank])

    return (
        <>
            <div className="game-container">
                <div className="table">
                    <NumBets nums={bets.nums} placeBet={placeBet} bets={bets.nums}/>
                    <BetType type="field" bet={bets.field} placeBet={placeBet}>
                        The Field
                        <p className="field-nums">2 3 4 9 10 11 12</p>
                    </BetType>
                    <BetType type="dont" bet={bets.dont} placeBet={placeBet}>Do not Pass</BetType>
                    <BetType type="pass" bet={bets.pass} placeBet={placeBet}>Pass Line</BetType>
                    <BetType type="odds" bet={bets.odds} placeBet={placeBet}>Odds</BetType>
                </div>
            </div>
            <Interface point={point} roll={rollDice} changeWager={adjustBet} dice={dice} bank={bank}/>
        </>
    )
}

export default Craps