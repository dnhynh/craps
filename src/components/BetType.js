import React from "react"
import styled from "styled-components"
import PropTypes from 'prop-types'

const BetSpace = styled.div`
    border-bottom: 1px solid gray;
    padding: 20px 0;
    cursor: pointer;
    position: relative;

    &:hover {
        border: 2px solid black;
    }

    &.num {
        border-right: 1px solid gray;
    }
`
const Wager = styled.div`
    border-radius: 50%;
    position: absolute;
    left: 10px;
    width: 30px;
    height: 30px;
    background-color: #972127;
    font-size: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const BetType = (props) => {
    
    const handleBet = () => {
        props.handleBet({type: props.type, value: props.value})
    }

    const handleRemove = (e) => {
        e.preventDefault()
        console.log('firing')
        props.handleRemove({type: props.type, value: props.value} )
    }

    return (
        <BetSpace type={props.value} onClick={handleBet} onContextMenu={handleRemove}>
            {props.bet && <Wager>{props.bet}</Wager>}
            {props.children}
        </BetSpace>
    )
}

BetType.propTypes = {
    handleBet: PropTypes.func.isRequired
}

export default BetType