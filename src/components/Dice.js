import React from "react"
import styled from "styled-components"

const Die = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 16px;
    padding: 8px;

    background-color: tomato;
    width: 80px;
    height: 80px;
    object-fit: contain;

    box-shadow:
    inset 0 5px #ff826b, 
    inset 0 -5px #cc4f38,
    inset 5px 0 #e5593f, 
    inset -5px 0 #e5593f;

    border-radius: 10%;
`

const Pip = styled.span`
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin: 4px;

    background-color: #fff;
    box-shadow: inset 0 1px #999999, inset 0 -1px #e5e5e5;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const one = {
    justifyContent: "center",
    alignItems: "center"
}

const Dice = (props) => {
    switch (props.value) {
        // Dice has no value on start
        default:
            return (
                <Die>
                    <Pip></Pip>
                    <Pip style={{alignSelf: "center"}}></Pip>
                    <Pip style={{alignSelf: "flex-end"}}></Pip>
                </Die>
            )
        case 1:
            return (
                <Die style={one}>
                    <Pip></Pip>
                </Die>
            )
        case 2:
            return (
                <Die>
                    <Pip></Pip>
                    <Pip style={{alignSelf: "flex-end"}}></Pip>
                </Die>
            )
        case 3:
            return (
                <Die>
                    <Pip></Pip>
                    <Pip style={{alignSelf: "center"}}></Pip>
                    <Pip style={{alignSelf: "flex-end"}}></Pip>
                </Die>
            )
        case 4:
            return (
                <Die>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                </Die>
            )
        case 5:
            return (
                <Die>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                    <Column style={{justifyContent: "center"}}>
                        <Pip></Pip>
                    </Column>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                </Die>
            )
        case 6:
            return (
                <Die>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                    <Column>
                        <Pip></Pip>
                        <Pip></Pip>
                        <Pip></Pip>
                    </Column>
                </Die>
            )
    }
}

Dice.defaultProps = {
    value: 3
}

export default Dice