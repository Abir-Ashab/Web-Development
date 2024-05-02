import { useState } from 'react' //hook
import './hook.css'

function Hook() {
  let [value, setValue] = useState(16) //kelma of hooks....Syntax: const [state, setState] = useState(initialState);
  let addval = () => {
    console.log("Value added : " + value)
    setValue(value + 1)
  }
  return (
    <>
      <h2>Value after adding hook is {value}</h2>
      {/* way 1, no need to declare addval */}
      <button onClick={ () => {
          console.log("Value added : " + value)
          setValue(value + 1)
      }}>Add Value {value} </button>
      {/* way 2 */}
      <button onClick={addval}>Add Value {value} </button> 
       {/* ei je value change hochchhe eta ke bole re-rendering or reconciliation */}
      <h2>Value after adding hook is {value}</h2>
    </>
  )
}
export default Hook
