import { createContext, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import Changer from './Components/Changer';

export const detailContext = createContext();

function App() {
  const [count, setCount] = useState(0)

  return (
    <detailContext.Provider value = {[count, setCount]}>
      <h1>Count is : {count}</h1>
      <Changer></Changer>
      <Home count = {count}></Home>
    </detailContext.Provider>
  )
}

export default App
