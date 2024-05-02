import { useState } from 'react' //hook
import './App.css'

function App() {
  let value = 5
  let addval = () => {
    value ++;
    console.log("Value added : " + value)
  }
  return (
    <>
      <h2>Value is {value}</h2>
      <button onClick={addval}>Add Value {value}</button> 
      <h2>Value is now {value}</h2>
    </>
  )
}
export default App
