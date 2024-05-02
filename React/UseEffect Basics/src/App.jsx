import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [nayoks, setnayoks] = useState([])
  useEffect (() => {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json()) // res = response
    .then(data => setnayoks(data))
  }, [])
  // [] eta dara bujhay je useEffect ta ekbar e use kora jabe, eta na dile prottek bar change hobe ar useEffect call hobe, ei loop e pore jabe
  return (
    <>
     {nayoks.map(chur => <Naiyok naam = {chur.name} daaknaam = {chur.username} key = {chur.id} ></Naiyok>)}
    </>
  )
}
function Naiyok(props) {
  return (
    <>
     <h1>He is {props.naam}</h1>
     <h3>Or daaknaam {props.daaknaam}</h3>
    </>
  )
}
export default App
