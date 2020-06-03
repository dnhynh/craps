import React from "react"
import styled from "styled-components"
import PropTypes from 'prop-types'
import rollSound from "../static/roll_sound.mp3"

const rs = new Audio(rollSound)

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
    font-size: .25rem;
    padding: 10px 5px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
        border: 2px solid black;
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
        rs.play()
        props.roll()
    }

    return (
        <div className="interface-container">
            <div>
                <p>Point: {props.point}</p>
                <p>Current Roll: {props.dice.total}</p>
            </div>
            <div className="interface">
                <div style={{display: "flex", alignItems: "center"}}>
                    <p style={{marginRight: "10px"}}>ChipStack: {props.bank.chips}</p>
                    <p style={{marginRight: "10px"}}>Bet: {props.bank.wager}</p>
                    <AdjustBetButton onClick={minusTen}>- 10</AdjustBetButton>
                    <AdjustBetButton onClick={addTen}>+ 10</AdjustBetButton>
                </div>
                <div className="die">{props.dice.first}</div>
                <div className="die">{props.dice.second}</div>
            </div>
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