import { useState } from 'react'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className="bg-green-400 rounded-full p-8 w-auto mb-4">Tailwind er shathe react</h1>
     <Card naam = "Abir" itihash = "A passionate software engineering student from IIT,University of Dhaka.I have completed my first ever project on ML.I have implemented five machine learning algorithm in c/c++.Also I am doing competitive programming to increase my problem solving capability.I like to solve and think a problem in different ways.Additionaly currently I got interest in cyber security and working on this as well."/>
     <br />
     <Card naam = "Niloy" itihash = "A passionate software engineering student from IIT,University of Dhaka.I have completed my first ever project on ML.I have implemented five machine learning algorithm in c/c++.Also I am doing competitive programming to increase my problem solving capability.I like to solve and think a problem in different ways.Additionaly currently I got interest in cyber security and working on this as well."/>
    </>
  )
}
export default App
