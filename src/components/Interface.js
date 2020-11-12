import React from "react"
import styled, {keyframes} from "styled-components"
import PropTypes from 'prop-types'
import Dice from "./Dice"

const RollButton = styled.button`
    font-family: "Press Start 2P";
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid black;
    cursor: pointer;

    &:hover {
        border: 2px solid black;
    }
`

const AdjustBetButton = styled.button`
    border: 1px solid black;
    font-family: "Press Start 2P";
    border-radius: 5px;
    font-size: .15rem;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
        border: 2px solid black;
    }
`

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
`
const WinningsBox = styled.div`
    align-self: normal;
    position: relative;
    min-width: 150px;
    margin: 0 20px;
`

const fadeOut = keyframes`
    0% {
        opacity:1;
        top: 20px;
        bottom: 0;
    }
    100% {
        opacity:0;
        top: 0;
        bottom: 0;
    }
`

const Winnings = styled.p`
    position: absolute;
    color: #00b300;
    font-size: 2rem;
    opacity: 0;
    &.fade {
        opacity: 1;
        animation: ${fadeOut} ease 3s;
    }
` 

const Interface = (props) => {

    const addTen = () => {
        props.changeWager(10)
    }

    const minusTen = () => {
        props.changeWager(-10)
    }

    const rollDice = () => {
        props.roll()
    }

    return (
        <div>
            <div>
                <p>Point: {props.point.value}</p>
                <p>Current Roll: {props.dice.total}</p>
            </div>
            <Container>
                <WinningsBox>
                    <Winnings className={props.net > 0 ? "fade" : null}>+ {props.net}</Winnings>
                </WinningsBox>
                <div>
                    <p style={{marginRight: "10px"}}>Chip Stack: {props.bank.chips}</p>
                    <p style={{marginRight: "10px"}}>Bet: {props.bank.wager}</p>
                    <AdjustBetButton onClick={minusTen}>- 10</AdjustBetButton>
                    <AdjustBetButton onClick={addTen}>+ 10</AdjustBetButton>
                </div>
                <Dice value={props.dice.first} />
                <Dice value={props.dice.second} />
            </Container>
            <RollButton onClick={rollDice}>Roll Dice</RollButton>
        </div>
    )
}

Interface.defaultProps = {
    dieOne: 2,
    dieTwo: 5
}

Interface.propTypes = {
    dice: PropTypes.object.isRequired
}

export default Interface