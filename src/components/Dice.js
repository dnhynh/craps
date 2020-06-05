import React from "react"
import styled from "styled-components"

const Die = styled.div`
    height: 80px;
    width: 80px;
    line-height: 80px;
    margin: 10px;
    background-color: tomato;
    opacity: 0.9;
    border-radius: 5px;
    color: #fff;
`

const dotStyle = {
    display: "block",
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "white"
}

const Dice = (props) => {
    return (
        <Die>{props.value}</Die>
    )

    // if(props.value === 1) {
    //     return (
    //         <div class="dice first-face">
    //             <span class="dot"> </span>
    //         </div>
    //     )
    // }
}

export default Dice