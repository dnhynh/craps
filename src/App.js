import React from 'react'
import './App.css'
import Craps from "./components/Craps"
import GameEvent from "./components/GameEvent"

function App() {
  return (
    <div className="App">
      <Craps />
      <GameEvent />
    </div>
  );
}

export default App;