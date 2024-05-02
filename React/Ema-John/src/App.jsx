import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Shop from './components/shops/Shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Shop></Shop>
    </>
  )
}

export default App
