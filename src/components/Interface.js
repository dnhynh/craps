import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

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
    border-radius: 50%;
    border: 1px solid black;
    font-family: "Press Start 2P";
    font-size: .5rem;
    padding: 10px 5px;
    cursor: pointer;

    &:hover {
        border: 2px solid black;
    }
`

const Interface = (props) => {
    return (
        <div className="interface-container">
            <div>{props.currentRoll}</div>
            <div className="interface">
                <div style={{display: "flex", flexDirection: "column"}}>
                    <p>Bet: {props.bet}</p>
                    <AdjustBetButton>+ 5</AdjustBetButton>
                    <AdjustBetButton>- 5</AdjustBetButton>
                </div>
                <div className="die">{props.dieOne}</div>
                <div className="die">{props.dieTwo}</div>
            </div>
            <RollButton onClick={props.rollDice}>Roll Dice</RollButton>
        </div>
    )
}

Interface.defaultProps = {
    dieOne: 2,
    dieTwo: 5
}

Interface.propTypes = {
    rollDice: PropTypes.func.isRequired
}

export default Interface