import {useState} from "react"

/*
    Custom hook returns all game logic state functions
*/

import {chipSound, loseSound, moneySound, rollSound} from "../components/Sounds"

const useCrapsLogic = () => {
    // Variables for board resets
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
    const [point, setPoint] = useState(resetPoint)
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
            chipSound.play()
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
        rollSound.play()
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
            net === 0 && loseSound.play()
            setBets(emptyBoard)
        }
        // Only set new bank if net greater or less than 0
        if(net) {
            moneySound.play()
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

    const resolveRoll = () => {
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
    }

    return {
        dice, 
        resolveRoll,
        handleBet,
        adjustBet,
        rollDice,
        bets,
        net,
        point,
        bank
    }
}

export default useCrapsLogic