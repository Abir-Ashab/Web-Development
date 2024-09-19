import { useState } from 'react'
import './App.css'
import Print from './components/print'

function App() {
  const [show, setShow] = useState(false)
  return (
    <>
      <div> 
          <p>Is friend? {show.toString()} </p>
          <button onClick={()=> setShow(!show)}>toggle</button>
          <Print show = {show}></Print>
      </div>
        
    </>
  )
}

export default App
