import React from "react"
import styled from "styled-components"

const Modal = styled.div`
    display: none;
    background-color: rgba(0,0,0, .7);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
`

const GameEvent = () => {
    return (
        <Modal>
        </Modal>
    )
}

export default GameEvent
