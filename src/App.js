import React from 'react'
import './App.css'
import Dice from "./components/Dice"
import Table from "./components/Table"

function App() {
  return (
    <div className="App">
      <Table />
      <Dice one={Math.ceil(Math.random() * 6)}/>
    </div>
  );
}

export default App;
