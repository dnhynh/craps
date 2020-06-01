import React from "react"
import styled from "styled-components";

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
`

const BetType = (props) => {
    
    const placeBet = ({type, value} = {type: "", value: null}) => {
        props.placeBet({type: props.type, value: props.value});
    }

    return (
        <BetSpace type={props.value} onClick={placeBet}>
            {props.wager && <Wager>{props.wager}</Wager>}
            {props.children}
        </BetSpace>
    )
}

export default BetType