import { useState } from 'react' //hook
import './hook.css'

function Hook() {
  let [value, setValue] = useState(16) //kelma of hooks
  let addval = () => {
    console.log("Value added : " + value)
    setValue(value + 1)
  }
  return (
    <>
      <h2>Value after adding hook is {value}</h2>
      <button onClick={addval}>Add Value {value} </button>
      <h2>Value after adding hook is {value}</h2>
    </>
  )
}
export default Hook
