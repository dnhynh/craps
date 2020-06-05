import React, {useState, useEffect} from "react"
import Interface from "./Interface"
import BetType from "./BetType"
import NumBets from "./NumBets"
import chipSound from "../static/chip_sound.mp3"
const cs = new Audio(chipSound)

const Craps = () => {
    const emptyBoard = {
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
    }
    const noPoint = {value: null, turn: null}
    const [bets, setBets] = useState(emptyBoard)

    // Check game state and place bet if valid
    const handleBet = (bet) => {
        const {type, value} = bet
        // Pass
        if(type === "pass" && !point.value) {
            placeBet(type)
        }
        // Dont
        if(type === "dont" && !point.value) {
            placeBet(type)
        }
        // Odds
        if(type === "odds" && point.value && bets.pass && dice.turn === point.turn) {
            placeBet(type)
        }
        // Nums
        if(type === "nums" && point.value && value !== point) {
            placeBet(type, value)
        }
        // Field
        if(type === "field") {
            placeBet(type)
        }
    }

    // Helper function places bet
    const placeBet = (type, value) => {
        if(bank.wager<= bank.chips) {
            cs.play()
            setBets((prevBets) => {
                if(type === "nums") {
                    const newNums = {...prevBets.nums}
                    newNums[value] += bank.wager
                    return {...prevBets, nums: newNums}
                }
                else {
                    const newBets = {...prevBets}
                    newBets[type] += bank.wager
                    return newBets
                }
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

    const [point, setPoint] = useState({value: null, turn: null})
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

    const resolveBets = (result) => {
        // Track net gain or loss
        let net = 0 - bets.pass - bets.odds - bets.dont
        //pass
        if(result === "pass") {
            if(bets.pass) {
                net += bets.pass * 2 
            }
            if(bets.odds) {
                
            }
            if(bets.dont) {
                net -= bets.dont
            }
        }
        //dont
        if(result === "dont") {
            if(bets.pass) {
                
            }
            if(bets.dont) {
                net += bets.dont * 2
            }
        }
        // Only set new bank if net greater or less than 0
        if(net) {
            setBank((prevBank) => {
                const newBank = {
                    ...prevBank,
                    chips: prevBank.chips + net
                }
                return newBank
            })
        }
        // Reset Board
        setBets(emptyBoard)
        //odds
        //nums
        //field
    }

    const [bank, setBank] = useState({
        chips: 100,
        wager: 10,
    })

    useEffect(() => {
        // Initial Roll
        if(!point.value) {
            if(dice.total === 7 || dice.total === 11) {
                resolveBets('pass')
                setPoint(noPoint)
            }
            else if(dice.total === 2 || dice.total === 3 || dice.total === 12) {
                resolveBets(false, dice.total)
                resolveBets('dont')
                setPoint(noPoint)
            }
            else {
                setPoint({value: dice.total, turn: dice.turn})
            }
        }
        // Point is Set
        else if(point.value) {
            if(dice.total === point.value) {
                setPoint(noPoint)
                resolveBets('pass')
            }
            if(dice.total === 7) {
                resolveBets('dont')
                setPoint(noPoint)
            }
        }
    }, // eslint-disable-next-line
    [dice])

    return (
        <>
            <div className="game-container">
                <div className="table">
                    <NumBets nums={bets.nums} handleBet={handleBet} bets={bets.nums}/>
                    <BetType type="field" bet={bets.field} handleBet={handleBet}>
                        The Field
                        <p className="field-nums">2 3 4 9 10 11 12</p>
                    </BetType>
                    <BetType type="dont" bet={bets.dont} handleBet={handleBet}>Do not Pass</BetType>
                    <BetType type="pass" bet={bets.pass} handleBet={handleBet}>Pass Line</BetType>
                    <BetType type="odds" bet={bets.odds} handleBet={handleBet}>Odds</BetType>
                </div>
            </div>
            <Interface point={point} roll={rollDice} changeWager={adjustBet} dice={dice} bank={bank}/>
        </>
    )
}

export default Craps