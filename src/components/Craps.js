import React, {useState, useEffect} from "react"
import styled from "styled-components"
import Interface from "./Interface"
import BetType from "./BetType"
import NumBets from "./NumBets"
import chipSound from "../static/chip_sound.mp3"
import moneySound from "../static/money_sound.mp3"
import loseSound from "../static/sweep.mp3"
const cs = new Audio(chipSound)
const ms = new Audio(moneySound)
const ls = new Audio(loseSound)
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
    const fieldRolls = [2, 3, 4, 9, 10, 11, 12]
    const emptyBoard = {
        pass: null, 
        dont: null, 
        field: null,
        nums: {
            10: null,
            9: null,
            8: null,
            6: null,
            5: null,
            4: null
        },
        odds: null
    }
    const resetPoint = {value: null, turn: null}
    const [bets, setBets] = useState(emptyBoard)
    const [bank, setBank] = useState({
        chips: 100,
        wager: 10,
    })
    const [point, setPoint] = useState({value: null, turn: null})
    const [dice, setDice] = useState({
        first: null,
        second: null,
        total: null,
        turn: 0
    })
    const [net, setNet] = useState(0)

    // Check game state and place bet if valid
    const handleBet = (bet) => {
        const {type, value, remove} = bet
        // Pass
        if(type === "pass" && !point.value) {
            // If remove boolean is passed remove bet instead
            remove ? removeBet(type) : placeBet(type)
        }
        // Dont Pass
        if(type === "dont" && !point.value) {
            remove ? removeBet(type) : placeBet(type)
        }
        // Odds
        if(type === "odds" && point.value && bets.pass && dice.turn === point.turn) {
            remove ? removeBet(type) : placeBet(type)
        }
        // Nums
        if(type === "nums" && point.value != value) {
            remove ? removeBet(type, value) : placeBet(type, value)
        }
        // Field
        if(type === "field") {
            remove ? removeBet(type) : placeBet(type)
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

    // Helper function removes bet
    const removeBet = (type, value) => {
        if(type === "nums") {
            setBank({
                chips: bank.chips + bets.nums[value],
                wager: bank.wager
            })
            setBets((prevBets) => {
                const newNums = {...prevBets.nums}
                newNums[value] = null
                return {...prevBets, nums: newNums}
            })
        }
        else {
            setBank ({
                chips: bank.chips + bets[type],
                wager: bank.wager 
            })
            setBets((prevBets) => {
                const newBets = {...prevBets}
                newBets[type] = null
                return newBets
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
        // Track total gain
        let net = 0
        // Check Field
        if(bets.field && fieldRolls.includes(dice.total)) {
            net += bets.field
            // pay 2 to 1 for roll of two and twelve
            if(dice.total === 2 || dice.total === 12) net += bets.field
        }
        else {
            setBets((prevBets) => ({...prevBets, field: null}))
        }
        if(result === "neutral") {
            // Payout any number bet
            for(let num in bets.nums) {
                if(bets.nums[num] && dice.total == num) {
                    net += bets.nums[num]
                }
            }
        }
        // Pass
        if(result === "pass" && bets.pass) {
            net += bets.pass
            if(bets.odds) {
                if(dice.total === 4 || dice.total === 10) {
                    net += bets.odds * 3
                }
                if(dice.total === 5 || dice.total === 9) {
                    net += bets.odds * 2.5 
                }
                if(dice.total === 6 || dice.total === 8) {
                    net += bets.odds * 2.2 
                }
            }
            if(bets.dont) {
                net += bets.dont
            }
            setBets((prevBets) => {
                const newBets = {...prevBets, odds: null, field: null, dont: null}
                return newBets
            })
        }
        // Dont Pass
        if(result === "dont") {
            if(bets.dont) {
                net += bets.dont * 2
            }
            net === 0 && ls.play()
            setBets(emptyBoard)
        }
        // Only set new bank if net greater or less than 0
        if(net) {
            ms.play()
            setNet(net)
            setTimeout(() => setNet(0), 3000)
            setBank((prevBank) => {
                const newBank = {
                    ...prevBank,
                    chips: prevBank.chips + net
                }
                return newBank
            })
        }
    }

    useEffect(() => {
        // Initial Roll
        if(!point.value) {
            if(dice.total === 7 || dice.total === 11) {
                setPoint(resetPoint)
                resolveBets('pass')
            }
            else if(dice.total === 2 || dice.total === 3 || dice.total === 12) {
                setPoint(resetPoint)
                resolveBets('dont')
            }
            else {
                setPoint({value: dice.total, turn: dice.turn})
                resolveBets('neutral')
            }
        }
        // Point is Set
        else if(point.value) {
            if(dice.total === point.value) {
                setPoint(resetPoint)
                resolveBets('pass')
            }
            if(dice.total === 7) {
                setPoint(resetPoint)
                resolveBets('dont')
            }
            else {
                resolveBets('neutral')
            }
        }
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
            <Interface net={net} point={point} roll={rollDice} changeWager={adjustBet} dice={dice} bank={bank}/>
        </>
    )
}

export default Craps