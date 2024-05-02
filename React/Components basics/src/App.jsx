// If I wanna use bairer component
import { useState } from "react"
import Bairer_component from "./component"
import Components from "./components_usingMap"
function App() {
  return (
    <>
      <Cricketer></Cricketer>
      <Naiyok name = "SRK" kaaj ="movie kore"></Naiyok>
      <Naiyok name = "LEO" kaaj ="movie kore"></Naiyok>
      <Bairer_component></Bairer_component>
      <Components></Components> 
      {/* rendering multiple elements */}
      <Counter></Counter>
    </>
  )
}

// if I wanna use it without props
function Cricketer() {
  return (
    <>
     <h1>He is Sakib Al Hasan</h1>
     <h3>Oy hochchhe khele</h3>
    </>
  )
}

function Naiyok(props) {
  console.log(props);
  return (
    <>
     <h1>He is {props.name}</h1>
     <h3>Oy hochchhe {props.kaaj}</h3>
    </>
  )
}

function Counter () {
  const[count, setCount] = useState(0);
  
  let increase = () => {
    setCount(count + 1)
  }
  let decrease = () => {
    setCount(count - 1)
  }
  return <>
  <button onClick={increase}>count is {count}</button>
  <button onMouseMove={decrease}>count is {count}</button>
  </>
}
export default App
